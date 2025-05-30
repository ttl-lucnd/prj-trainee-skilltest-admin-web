import { BaseDialog } from '@/components/BaseDialog';
import { useAdminStore } from '../stores/useAdminStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/form/input';
import { useTranslations } from 'next-intl';
import { updateAdminYupResolver } from '../schema';
import { adminService } from '../services/admin.service';
import { IBodyResponse } from '@/utils/interfaces';
import { AdminFormType, IAdminAccount, IUpdateAdminBody } from '../interfaces';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
export function AdminForm() {
  const t = useTranslations();
  const { selectedAdmin, isOpenAdminFormDialog, setOpenAdminFormDialog, getAdminList } = useAdminStore(
    useShallow((state) => ({
      selectedAdmin: state.selectedAdmin,
      isOpenAdminFormDialog: state.isOpenAdminFormDialog,
      setOpenAdminFormDialog: state.setOpenAdminFormDialog,
      getAdminList: state.getAdminList,
    })),
  );

  const [formType, setFormType] = useState<AdminFormType>(AdminFormType.CREATE);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: updateAdminYupResolver,
    mode: 'onChange', 
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
    }
  });

  useEffect(() => {
    if (!isOpenAdminFormDialog) return;

    const getAdminDetail = async () => {
      const response: IBodyResponse<IAdminAccount> = await adminService._getDetail(selectedAdmin?.id ?? '');
      if (response.success) {
        form.reset({
          email: response.data.email,
          name: response.data.name,
        });
      }
    };

    if(selectedAdmin) {
      setFormType(AdminFormType.UPDATE);
      getAdminDetail();
    } else {
      setFormType(AdminFormType.CREATE);
      form.reset({
        email: '',
        name: '',
      });
    }

  }, [isOpenAdminFormDialog, selectedAdmin, setFormType]);

  const onSubmit = async (data: IUpdateAdminBody) => {
    try {
      setLoading(true);
      const response: IBodyResponse<IAdminAccount> = selectedAdmin
        ? await adminService.updateAdmin(selectedAdmin.id, data)
        : await adminService.createAdmin(data);

      if(response.success) {
        setOpenAdminFormDialog(false);
        toast({
          title: t(`common.messages.${formType}_success`),
          variant: 'success',
        })
        getAdminList()
      }else {
        toast({
          title: t(`common.messages.${formType}_failed`),
          variant:'destructive',
        })
      }
    }catch {
      setOpenAdminFormDialog(false);
      toast({
        title: t('common.messages.error'),
        variant:'destructive',
      })
    }finally{
      setLoading(false);
    }
  };

  return (
    <BaseDialog
      open={isOpenAdminFormDialog}
      onOpenChange={setOpenAdminFormDialog}
      showCloseButton={true}
      title={t(`adminAccount.title.${formType}`)} 
      className="max-w-[500px]"
      headerClassName='block'
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <Form {...form}>
          <InputText 
            name="email" 
            control={form.control} 
            label={t('adminAccount.form.email')} 
            placeholder={t('adminAccount.form.email')} 
            layout='vertical'
            className='w-full'
            required={true}
          />
          <InputText 
            name="name" 
            control={form.control} 
            label={t('adminAccount.form.name')} 
            placeholder={t('adminAccount.form.name')} 
            layout='vertical'
            className='w-full mb-5'
            required={true}
          />
        </Form>
        <div className="w-full flex gap-2.5 justify-center">
          <Button
            variant="outline"
            className="w-[120px] h-[40px]"
            onClick={() => setOpenAdminFormDialog(false)}
          >
            {t('common.buttons.cancel')}
          </Button>
          <Button
            type='submit'
            className="w-[120px] h-[40px]"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isDirty || !form.formState.isValid || loading}
          >
            {t('common.buttons.save')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
