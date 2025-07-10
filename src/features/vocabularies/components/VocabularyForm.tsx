import { BaseDialog } from '@/components/BaseDialog';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/form/input';
import { useTranslations } from 'next-intl';
import { updateVocabularyYupResolver } from '../schema';
import { IBodyResponse } from '@/utils/interfaces';
import { IVocabulary, IVocabularyFormBody } from '../interfaces';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { UploadField } from '@/components/form/upload';
import { DEFAULT_MAX_SIZE } from '@/utils';
import { cn } from '@/lib/utils';
import { fileApiService } from '@/features/common/service/file.api.service';
import { vocabularyService } from '../services/vocabulary.service';
import { InputTextArea } from '@/components/form/input-text-area';
import { ComboboxField } from '@/components/form/combobox';

export function VocabularyForm() {
  const t = useTranslations();
  const { subjectDropdownList, selectedVocabulary, isOpenVocabularyFormDialog, setOpenVocabularyFormDialog, getVocabularyList } = useVocabularyStore(
    useShallow((state) => ({
      subjectDropdownList: state.subjectDropdownList,
      selectedVocabulary: state.selectedVocabulary,
      isOpenVocabularyFormDialog: state.isOpenVocabularyFormDialog,
      setOpenVocabularyFormDialog: state.setOpenVocabularyFormDialog,
      getVocabularyList: state.getVocabularyList,
    })),
  );

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<IVocabularyFormBody>({
    resolver: updateVocabularyYupResolver,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    setImageFile(null);

    form.reset({
      image: selectedVocabulary?.image ?? '',
    });

    const getVocabularyDetail = async () => {
      const response: IBodyResponse<IVocabulary> = await vocabularyService._getDetail(selectedVocabulary?.id ?? '');
      if (response.success) {
        form.reset({ // reload data on database
          image: response.data.image ?? '',
          vocabulary: response.data.vocabulary.originalLanguage,
          description: response.data.description.originalLanguage,
          subjectId: response.data.subjectId,
          pronunciation: response.data.pronunciation,
        });
      }
    };

    if(selectedVocabulary && isOpenVocabularyFormDialog) {
      getVocabularyDetail();
    } 
  }, [isOpenVocabularyFormDialog, selectedVocabulary]);

  const onSubmit = async (data: IVocabularyFormBody) => {
    if(!selectedVocabulary) return;
    if(loading) return;
    try {
      setLoading(true);
      if(imageFile) {
        data.image = await getImageUrl(imageFile);
      }

      const response: IBodyResponse<IVocabulary> = await vocabularyService.updateVocabulary(selectedVocabulary.id, data);

      if(response.success) {
        setOpenVocabularyFormDialog(false);
        toast({
          title: t(`common.messages.update_success`),
          variant: 'success',
        })
        getVocabularyList();
        return;
      }
      let errorKey = `common.messages.update_failed`;
      if(response?.errors && response.errors[0]?.errorKey === 'question.error.question.existed') {
        errorKey='questions.error.nameExisted';
      }
      toast({
        title: t(errorKey),
        variant:'destructive',
      })
    }catch {
      setOpenVocabularyFormDialog(false);
      toast({
        title: t('common.messages.error'),
        variant:'destructive',
      })
    }finally{
      setLoading(false);
    }
  };

  const getImageUrl = async (file?: File|null) => {
    if(!file) return '';
    const response = await fileApiService.uploadFile(file);
    if(response.success) {
      return response.data.url;
    };
    return '';
  }

  return (
    <BaseDialog
      open={isOpenVocabularyFormDialog}
      onOpenChange={setOpenVocabularyFormDialog}
      showCloseButton={false}
      title={t('questions.form.updateTitle')} 
      className="max-w-[500px] max-h-[calc(100vh-2rem)] pb-0"
      headerClassName='block'
    >
      <div className="flex flex-col items-start justify-end gap-2.5 pb-2">
        <Form {...form}>
          <InputText 
            key={'vocabulary'}
            name="vocabulary" 
            control={form.control} 
            label={t('vocabularies.form.vocabulary')} 
            placeholder={t('vocabularies.form.vocabulary')} 
            layout='vertical'
            className='w-full'
            onChange={() => form.clearErrors('vocabulary')}
          />
          <InputText 
            key={'pronunciation'}
            name="pronunciation" 
            control={form.control} 
            label={t('vocabularies.form.pronunciation')} 
            placeholder={t('vocabularies.form.pronunciation')} 
            layout='vertical'
            className='w-full'
            onChange={() => form.clearErrors('pronunciation')}
          />
          <InputTextArea
            key={'vocab-description'}
            name="description" 
            control={form.control} 
            label={t('vocabularies.form.description')} 
            placeholder={t('vocabularies.form.description')} 
            layout='vertical'
            className='w-full'
            onChange={() => form.clearErrors('description')}
          />
          <ComboboxField
            key={'vocab-subjectId'}
            name="subjectId" 
            control={form.control} 
            label={t('vocabularies.form.subjectId')} 
            placeholder={t('vocabularies.form.subjectId')} 
            layout='vertical'
            className='w-full'
            options={subjectDropdownList.map(item => ({
              label: item.name,
              value: item.id,
            }))}
          />
          <UploadField
            key={'vocab-image'}
            name="image" 
            control={form.control} 
            label={t('vocabularies.form.image')} 
            layout='vertical'
            className='w-full'
            onChange={(file) => {
              setImageFile(file);
              form.setValue('image', URL.createObjectURL(file), { shouldValidate: true, shouldDirty: true,  })
            }}
            onRemove={() => {
              setImageFile(null);
              form.setValue('image', '', { shouldValidate: true, shouldDirty: true,  })
            }}
            onValidationFail={(file, type) => {
              form.setValue('image', URL.createObjectURL(file), { shouldValidate: false, shouldDirty: false,  })
              const message = t(`common.file.${type}`, {maxSize: DEFAULT_MAX_SIZE});
              form.setError('image', { message });
            }}
          />
        </Form>

      </div>
        <div className={cn("w-full pb-6 flex gap-2.5 bg-white justify-center pt-2 sticky left-0 bottom-0")}>
          <Button
            variant="outline"
            className="w-[120px] h-[40px]"
            onClick={() => setOpenVocabularyFormDialog(false)}
            disabled={loading}
          >
            {t('common.buttons.cancel')}
          </Button>
          <Button
            type='submit'
            className="w-[120px] h-[40px]"
            onClick={form.handleSubmit(onSubmit)}
            disabled={
              !form.formState.isDirty ||
              !form.formState.isValid ||
              !!form.formState.errors.image?.message
            }
            loading={loading}
          >
            {t('common.buttons.save')}
          </Button>
        </div>
    </BaseDialog>
  );
}
