import { BaseDialog } from '@/components/BaseDialog';
import { useQuestionStore } from '../stores/useQuestionStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/form/input';
import { useTranslations } from 'next-intl';
import { updateQuestionYupResolver } from '../schema';
import { questionService } from '../services/question.service';
import { IBodyResponse } from '@/utils/interfaces';
import { IQuestion, IQuestionFormBody } from '../interfaces';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { UploadField } from '@/components/form/upload';
import { DEFAULT_MAX_SIZE } from '@/utils';
import { cn } from '@/lib/utils';
import { fileApiService } from '@/features/common/service/file.api.service';
import { SelectSingle } from '@/components/form/select-single';
import { Badge } from '@/components/ui/badge';
import { CircleIcon, XCrossIcon } from '@/components/icons';
export function QuestionForm() {
  const t = useTranslations();
  const { subjectDropdownList, arrangeDropdownList, selectedQuestion, isOpenQuestionFormDialog, setOpenQuestionFormDialog, getQuestionList } = useQuestionStore(
    useShallow((state) => ({
      subjectDropdownList: state.subjectDropdownList,
      arrangeDropdownList: state.arrangeDropdownList,
      selectedQuestion: state.selectedQuestion,
      isOpenQuestionFormDialog: state.isOpenQuestionFormDialog,
      setOpenQuestionFormDialog: state.setOpenQuestionFormDialog,
      getQuestionList: state.getQuestionList,
    })),
  );

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<IQuestionFormBody>({
    resolver: updateQuestionYupResolver,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    setImageFile(null);

    form.reset({
      image: selectedQuestion?.image ?? '',
    });

    const getQuestionDetail = async () => {
      const response: IBodyResponse<IQuestion> = await questionService._getDetail(selectedQuestion?.id ?? '');
      if (response.success) {
        form.reset({ // reload data on database
          image: response.data.image ?? '',
          question: response.data.question,
          description: response.data.description,
          answer: String(response.data.answer),
          original: String(response.data.original),
          subjectId: response.data.subjectId,
          arrange: String(response.data.arrange),
        });
      }
    };

    if(selectedQuestion) {
      getQuestionDetail();
    } 
  }, [isOpenQuestionFormDialog, selectedQuestion]);

  const onSubmit = async (data: IQuestionFormBody) => {
    if(!selectedQuestion) return;
    if(loading) return;
    try {
      setLoading(true);
      if(imageFile) {
        data.image = await getImageUrl(imageFile);
      }

      const response: IBodyResponse<IQuestion> = await questionService.updateQuestion(selectedQuestion.id, data);

      if(response.success) {
        setOpenQuestionFormDialog(false);
        toast({
          title: t(`common.messages.update_success`),
          variant: 'success',
        })
        getQuestionList();
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
      setOpenQuestionFormDialog(false);
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
      open={isOpenQuestionFormDialog}
      onOpenChange={setOpenQuestionFormDialog}
      showCloseButton={false}
      title={t('questions.form.updateTitle')} 
      className="max-w-[500px] max-h-[calc(100vh-10px)] pb-0"
      headerClassName='block'
    >
      <div className="flex flex-col items-start justify-end gap-2.5 pb-2">
        <Form {...form}>
          <InputText 
            key={'question'}
            name="question" 
            control={form.control} 
            label={t('questions.form.question')} 
            placeholder={t('questions.form.question')} 
            layout='vertical'
            className='w-full'
            onChange={() => form.clearErrors('question')}
          />
          <InputText 
            key={'romaji'}
            name="description" 
            control={form.control} 
            label={t('questions.form.description')} 
            placeholder={t('questions.form.description')} 
            layout='vertical'
            className='w-full'
            onChange={() => form.clearErrors('description')}
          />
          <SelectSingle
            key={'question-subjectId'}
            name="subjectId" 
            control={form.control} 
            label={t('questions.form.subjectId')} 
            placeholder={t('questions.form.subjectId')} 
            layout='vertical'
            className='w-full'
            options={subjectDropdownList.map(item => ({
              label: item.name,
              value: item.id,
            }))}
          />
          <SelectSingle
            key={'arrange'}
            name="arrange" 
            control={form.control} 
            label={t('questions.form.arrange')} 
            placeholder={t('questions.form.arrange')} 
            layout='vertical'
            className='w-full'
            options={arrangeDropdownList.map(item => ({
              label: `${item}`,
              value: `${item}`,
            }))}
          />
          <SelectSingle
            key={'original'}
            name="original" 
            control={form.control} 
            label={t('questions.form.original')} 
            placeholder={t('questions.form.original')} 
            layout='vertical'
            className='w-full'
            options={[{
              value: 'true',
              label: '',
              customLabel: <Badge variant={'success'}>True</Badge>
            },{
              value: 'false',
              label: '',
              customLabel: <Badge variant={'error'}>False</Badge>
            }]}
          />
          <UploadField
            key={'question-image'}
            name="image" 
            control={form.control} 
            label={t('questions.form.image')} 
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
          <SelectSingle
            key={'answer'}
            name="answer" 
            control={form.control} 
            label={t('questions.form.answer')} 
            placeholder={t('questions.form.answer')} 
            layout='vertical'
            className='w-full'
            options={[{
              value: 'true',
              label: '',
              customLabel: <CircleIcon size={16}/>
            },{
              value: 'false',
              label: '',
              customLabel: <XCrossIcon size={16}/>
            }]}
          />
        </Form>

      </div>
        <div className={cn("w-full pb-6 flex gap-2.5 bg-white justify-center pt-2 sticky left-0 bottom-0")}>
          <Button
            variant="outline"
            className="w-[120px] h-[40px]"
            onClick={() => setOpenQuestionFormDialog(false)}
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
