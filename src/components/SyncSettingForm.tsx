import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { useForm, useWatch } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/form/input';
import { useTranslations } from 'next-intl';
import { IBodyResponse } from '@/utils/interfaces';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { InputNumber } from '@/components/form/input-number';
import { ISyncSettingBody, ISyncSettingDetail } from '@/features/common/interface';
import { syncSettingYupResolver } from '@/features/common/schema';

export function SyncSettingForm({
  isOpenSettingFormDialog,
  setOpenSettingFormDialog,
  handleUpdate,
  getSetting,
} : {
  readonly isOpenSettingFormDialog: boolean,
  readonly setOpenSettingFormDialog: (open: boolean) => void,
  readonly handleUpdate: (data: ISyncSettingBody) =>Promise<IBodyResponse<any>>,
  readonly getSetting: () => Promise<IBodyResponse<ISyncSettingDetail>>,
}) {
  const t = useTranslations();
  
  const form = useForm({
    resolver: syncSettingYupResolver,
    mode:'onBlur',
    reValidateMode: 'onBlur'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpenSettingFormDialog) return;

    const getDefaultSetting = async () => {
      const response = await getSetting();
      if (response.success) {
        form.reset({
          sheetLink: response.data.sheetLink,
          lastReadRow: response.data.lastReadRow,
        });
      }
    };

    getDefaultSetting();
  }, [isOpenSettingFormDialog]);

  const onSubmit = async (data: ISyncSettingBody) => {
    try {
      setLoading(true);
      const response: IBodyResponse<any> = await handleUpdate(data);

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
        setOpenSettingFormDialog(false);
        toast({
          title: t('common.messages.error'),
          variant:'destructive',
        })
    }finally {
      setLoading(false);
    }
  };

  const sheetLink = useWatch({ control: form.control, name: 'sheetLink' });
  const lastReadRow = useWatch({ control: form.control, name: 'lastReadRow' });

  return (
    <BaseDialog
      open={isOpenSettingFormDialog}
      onOpenChange={setOpenSettingFormDialog}
      showCloseButton={false}
      title={t('vocabularies.form.title')} 
      className="max-w-[500px]"
      headerClassName='block'
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <Form {...form}>
          <InputText 
          key={"sheetLink"}
          name="sheetLink" 
          control={form.control} 
          label={t('vocabularies.form.sheetLink')} 
          placeholder={t('vocabularies.form.sheetLink')} 
          layout='vertical'
          className='w-full'
          disabled={loading}
          onChange={()=>form.clearErrors('sheetLink')}
          customClassName='truncate'
          title={sheetLink}
          />

          <InputNumber 
          key={"lastReadRow"}
          name="lastReadRow" 
          control={form.control} 
          label={t('vocabularies.form.lastReadRow')} 
          placeholder={t('vocabularies.form.lastReadRow')} 
          layout='vertical'
          className='w-full'
          disabled={loading}
          onChange={()=> form.clearErrors('lastReadRow')}
          />
        </Form>
        <div className="w-full flex gap-2.5 justify-center mt-4 pb-0.5">
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
            disabled={
              loading ||
              !form.formState.isDirty ||
              !sheetLink ||
              !lastReadRow ||
              !!Object.keys(form.formState.errors).length
            }
          >
            {t('common.buttons.save')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
