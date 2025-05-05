import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { useAdminStore } from '../stores/useAdminStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';
export function AdminDeleteDialog() {
  const t = useTranslations();
  const { isOpenDeleteAdminDialog, setOpenDeleteAdminDialog } = useAdminStore(
    useShallow((state) => ({
      isOpenDeleteAdminDialog: state.isOpenDeleteAdminDialog,
      setOpenDeleteAdminDialog: state.setOpenDeleteAdminDialog,
    })),
  );

  return (
    <BaseDialog
      open={isOpenDeleteAdminDialog}
      onOpenChange={setOpenDeleteAdminDialog}
      showCloseButton={false}
      className="max-w-[400px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <h5 className="font-bold">{t('adminAccount.delete.title')}</h5>
        <div className="w-full flex gap-2.5 justify-between">
          <Button variant="outline" className="flex-1" onClick={() => setOpenDeleteAdminDialog(false)}>
            {t('common.buttons.cancel')}
          </Button>
          <Button variant="destructive" className="flex-1" onClick={() => setOpenDeleteAdminDialog(false)}>
            {t('common.buttons.delete')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
