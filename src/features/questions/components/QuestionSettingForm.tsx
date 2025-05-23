import { BaseDialog } from '@/components/BaseDialog';
import { useQuestionStore } from '../stores/useQuestionStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/form/input';
import { useTranslations } from 'next-intl';
import { questionSettingYupResolver } from '../schema';
import { questionService } from '../services/question.service';
import { IBodyResponse } from '@/utils/interfaces';
import { toast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { IUpdateQuestionSettingBody } from '../interfaces';

export function QuestionSettingForm() {
  const t = useTranslations();
  const { 
    isOpenSettingFormDialog, 
    setOpenSettingFormDialog,
  } = useQuestionStore(
    useShallow((state) => ({
      isOpenSettingFormDialog: state.isOpenSettingFormDialog,
      setOpenSettingFormDialog: state.setOpenSettingFormDialog,
    })),
  );
  
  const form = useForm({
    resolver: questionSettingYupResolver,
    mode: 'onChange', 
    reValidateMode: 'onChange',
    defaultValues: {
      sheetLink: '',
      lastReadRow: 0,
    }
  });

  useEffect(() => {
    if (!isOpenSettingFormDialog) return;

    const getQuestionSetting = async () => {
      const response = await questionService.getQuestionSetting();
      if (response.success) {
        form.reset({
          sheetLink: response.data.sheetLink,
          lastReadRow: response.data.lastReadRow,
        });
      }
    };

    getQuestionSetting();
  }, [isOpenSettingFormDialog]);

  const onSubmit = async (data: IUpdateQuestionSettingBody) => {
    try {
      const response: IBodyResponse<any> = await questionService.updateQuestionSetting(data);

      if(response.success) {
        setOpenSettingFormDialog(false);
        toast({
          title: t('common.messages.update_success'),
          variant: 'success',
        })
        
      }else {
        toast({
          title: t('common.messages.update_failed'),
          variant:'destructive',
        })
      }
    }catch {
        toast({
          title: t('common.messages.delete_success'),
          variant:'destructive',
        })
    }
  };

  return (
    <BaseDialog
      open={isOpenSettingFormDialog}
      onOpenChange={setOpenSettingFormDialog}
      showCloseButton={true}
      title={t('questions.form.title')} 
      className="max-w-[500px]"
      headerClassName='block'
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <Form {...form}>
          <InputText 
          name="sheetLink" 
          control={form.control} 
          label={t('questions.form.sheetLink')} 
          placeholder={t('questions.form.sheetLink')} 
          layout='vertical'
          className='w-full'
          />

          <InputText 
          name="lastReadRow" 
          control={form.control} 
          label={t('questions.form.lastReadRow')} 
          placeholder={t('questions.form.lastReadRow')} 
          layout='vertical'
          type='number'
          className='w-full mb-5'
          />
        </Form>
        <div className="w-full flex gap-2.5 justify-center">
          <Button
            variant="outline"
            className="w-[120px] h-[40px]"
            onClick={() => setOpenSettingFormDialog(false)}
          >
            {t('common.buttons.cancel')}
          </Button>
          <Button
            type='submit'
            className="w-[120px] h-[40px]"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isDirty || !form.formState.isValid}
          >
            {t('common.buttons.save')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
