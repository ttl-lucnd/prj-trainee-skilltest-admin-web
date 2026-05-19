import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { useAdminStore } from '../stores/useAdminStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';
import { adminService } from '../services/admin.service';
import { useState } from 'react';
import { IBodyResponse } from '@/utils/interfaces';
import { toast } from '@/hooks/use-toast';
export function AdminDeleteDialog() {
  const t = useTranslations();
  const { selectedAdmin, isOpenDeleteAdminDialog, setOpenDeleteAdminDialog, getAdminList } = useAdminStore(
    useShallow((state) => ({
      selectedAdmin: state.selectedAdmin,
      isOpenDeleteAdminDialog: state.isOpenDeleteAdminDialog,
      setOpenDeleteAdminDialog: state.setOpenDeleteAdminDialog,
      getAdminList: state.getAdminList,
    })),
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAdmin = async () => {
    setOpenDeleteAdminDialog(false);
    if(isDeleting) return;
    setIsDeleting(true);
    try {
      const response: IBodyResponse<unknown> = await adminService._delete(selectedAdmin?.id ?? '');

      if(response.success) {
        toast({
          title: t('common.messages.delete_success'),
          variant: 'success',
        })
        await getAdminList();
      }else {
        toast({
          title: t('common.messages.delete_failed'),
          variant:'destructive',
        })
      }
    }catch {
        toast({
          title: t('common.messages.error'),
          variant:'destructive',
        })
    }finally {
      setIsDeleting(false);
    }
  }

  return (
    <BaseDialog
      open={isOpenDeleteAdminDialog}
      onOpenChange={setOpenDeleteAdminDialog}
      showCloseButton={false}
      className="max-w-[400px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <h5 className="font-bold">{t('adminAccount.delete.title')}</h5>
        <div className="w-full flex gap-2.5 justify-center mt-4 pb-0.5">
          <Button variant="outline" className="w-[120px] h-[40px]" disabled={isDeleting} onClick={() => setOpenDeleteAdminDialog(false)}>
            {t('common.buttons.cancel')}
          </Button>
          <Button variant="destructive" className="w-[120px] h-[40px]" loading={isDeleting} onClick={() => handleDeleteAdmin()}>
            {t('common.buttons.delete')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
