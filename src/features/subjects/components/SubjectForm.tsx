import { BaseDialog } from '@/components/BaseDialog';
import { useSubjectStore } from '../stores/useSubjectStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/form/input';
import { useTranslations } from 'next-intl';
import { createSubjectYupResolver } from '../schema';
import { subjectService } from '../services/subject.service';
import { IBodyResponse } from '@/utils/interfaces';
import { SubjectFormType, ISubject, ISubjectFormBody } from '../interfaces';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { UploadField } from '@/components/form/upload';
import { DEFAULT_MAX_SIZE } from '@/utils';
import { InputNumber } from '@/components/form/input-number';
export function SubjectForm() {
  const t = useTranslations();
  const { selectedSubject, isOpenSubjectFormDialog, setOpenSubjectFormDialog, getSubjectList } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject,
      isOpenSubjectFormDialog: state.isOpenSubjectFormDialog,
      setOpenSubjectFormDialog: state.setOpenSubjectFormDialog,
      getSubjectList: state.getSubjectList,
    })),
  );

  const [formType, setFormType] = useState<SubjectFormType>(SubjectFormType.CREATE);
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<ISubjectFormBody>({
    resolver: createSubjectYupResolver,
    mode: 'onChange', 
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!isOpenSubjectFormDialog) return;
    setLogoFile(null);
    setImageFile(null);

    const getSubjectDetail = async () => {
      const response: IBodyResponse<ISubject> = await subjectService._getDetail(selectedSubject?.id ?? '');
      if (response.success) {
        form.reset({
          name: response.data.name,
          monthlyFee: response.data.monthlyFee,
          logo: response.data.logo ?? '',
          image: response.data.image ?? '',
        });
      }
    };

    if(selectedSubject) {
      setFormType(SubjectFormType.UPDATE);
      getSubjectDetail();
    } else {
      setFormType(SubjectFormType.CREATE);
      form.reset({
        name: '',
        monthlyFee: 0,
        logo: '',
        image: '',
      });
    }

  }, [isOpenSubjectFormDialog, selectedSubject, setFormType]);

  const onSubmit = async (data: ISubjectFormBody) => {
    try {
      setLoading(true);
      if(imageFile) {
        data.image = await getImageUrl(imageFile);
      }

      if(logoFile) {
        data.logo = await getImageUrl(logoFile);
      }

      const response: IBodyResponse<ISubject> = selectedSubject
        ? await subjectService.updateSubject(selectedSubject.id, data)
        : await subjectService.createSubject(data);

      if(response.success) {
        setOpenSubjectFormDialog(false);
        toast({
          title: t(`common.messages.${formType}_success`),
          variant: 'success',
        })
        getSubjectList()
      }else {
        toast({
          title: t(`common.messages.${formType}_failed`),
          variant:'destructive',
        })
      }
    }catch {
      setOpenSubjectFormDialog(false);
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
    const response = await subjectService.uploadFile(file);
    if(response.success) {
      return response.data.url;
    };
    return '';
  }

  return (
    <BaseDialog
      open={isOpenSubjectFormDialog}
      onOpenChange={setOpenSubjectFormDialog}
      showCloseButton={false}
      title={t(`subjects.title.${formType}`)} 
      className="max-w-[500px]"
      headerClassName='block'
    >
      <div className="flex flex-col items-start justify-end gap-2.5">
        <Form {...form} key={formType}>
          <InputText 
            key={'name'}
            name="name" 
            control={form.control} 
            label={t('subjects.form.subject')} 
            placeholder={t('subjects.form.subject')} 
            layout='vertical'
            className='w-full'
            disabled={loading}
          />
          <InputNumber 
            key={'monthlyFee'}
            name="monthlyFee" 
            control={form.control} 
            label={t('subjects.form.monthlyFee')} 
            placeholder={t('subjects.form.monthlyFee')} 
            layout='vertical'
            className='w-full'
            disabled={loading}
          />
          <UploadField
            key={'logo'}
            name="logo" 
            control={form.control} 
            label={t('subjects.form.logo')} 
            layout='vertical'
            className='w-full'
            onChange={(file) => {
              setLogoFile(file);
              form.setValue('logo', URL.createObjectURL(file), { shouldValidate: true, shouldDirty: true,  })
            }}
            onRemove={() => {
              setLogoFile(null);
              form.setValue('logo', '', { shouldValidate: true, shouldDirty: true,  })
            }}
            disabled={loading}
            onValidationFail={(type) => {
              const message = t(`common.file.${type}`, {maxSize: DEFAULT_MAX_SIZE});
              form.setError('logo', { message });
            }}
          />
          <UploadField
            key={'image'}
            name="image" 
            control={form.control} 
            label={t('subjects.form.image')} 
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
            disabled={loading}
            onValidationFail={(type) => {
              const message = t(`common.file.${type}`, {maxSize: DEFAULT_MAX_SIZE});
              form.setError('image', { message });
            }}
          />
        </Form>
        {formType === SubjectFormType.UPDATE && 
        <div className='text-[#E9034E]'>
            {t('subjects.form.message')}
        </div>}
        <div className="w-full flex gap-2.5 justify-center mt-5">
          <Button
            variant="outline"
            className="w-[120px] h-[40px]"
            onClick={() => setOpenSubjectFormDialog(false)}
          >
            {t('common.buttons.cancel')}
          </Button>
          <Button
            type='submit'
            className="w-[120px] h-[40px]"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isDirty || !form.formState.isValid || loading || !(form.watch('name') || '').trim()}
          >
            {t(`common.buttons.${formType ===SubjectFormType.CREATE ? 'add' : 'save'}`)}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
