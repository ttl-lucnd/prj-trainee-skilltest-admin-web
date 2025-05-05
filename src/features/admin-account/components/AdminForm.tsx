import { BaseDialog } from '@/components/BaseDialog';
import { useAdminStore } from '../stores/useAdminStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/form/input';
import { useTranslations } from 'next-intl';
export function AdminForm() {
  const t = useTranslations();
  const { isOpenAdminFormDialog, setOpenAdminFormDialog } = useAdminStore(
    useShallow((state) => ({
      isOpenAdminFormDialog: state.isOpenAdminFormDialog,
      setOpenAdminFormDialog: state.setOpenAdminFormDialog,
    })),
  );

  const form = useForm();

  return (
    <BaseDialog
      open={isOpenAdminFormDialog}
      onOpenChange={setOpenAdminFormDialog}
      showCloseButton={false}
      className="max-w-[400px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <Form {...form}>
          <InputText name="email" control={form.control} label={t('adminAccount.form.email')} placeholder={t('adminAccount.form.email')} />
          <InputText name="name" control={form.control} label={t('adminAccount.form.name')} placeholder={t('adminAccount.form.name')} />
        </Form>
        <div className="w-full flex gap-2.5 justify-between">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setOpenAdminFormDialog(false)}
          >
            {t('common.buttons.cancel')}
          </Button>
          <Button
            className="flex-1"
            onClick={() => setOpenAdminFormDialog(false)}
          >
            {t('common.buttons.save')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
