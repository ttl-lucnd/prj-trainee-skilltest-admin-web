import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { usePackageStore } from '../../stores/usePackageStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';
import { packageService } from '../../services/package.service';
import { useState } from 'react';
import { IBodyResponse } from '@/utils/interfaces';
import { toast } from '@/hooks/use-toast';
export function PackageDeleteDialog() {
  const t = useTranslations();
  const {
    selectedPackage,
    isOpenDeletePackageDialog,
    setOpenDeletePackageDialog,
    getPackageList,
  } = usePackageStore(
    useShallow((state) => ({
      selectedPackage: state.selectedPackage,
      isOpenDeletePackageDialog: state.isOpenDeletePackageDialog,
      setOpenDeletePackageDialog: state.setOpenDeletePackageDialog,
      getPackageList: state.getPackageList,
    })),
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePackage = async () => {
    setOpenDeletePackageDialog(false);
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const response: IBodyResponse<any> = await packageService._delete(
        selectedPackage?.id ?? '',
      );

      if (response.success) {
        toast({
          title: t('common.messages.delete_success'),
          variant: 'success',
        });
        await getPackageList();
      } else {
        toast({
          title: t('common.messages.delete_failed'),
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: t('common.messages.error'),
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <BaseDialog
      open={isOpenDeletePackageDialog}
      onOpenChange={setOpenDeletePackageDialog}
      showCloseButton={false}
      className="max-w-[400px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <h5 className="font-bold">{t('packages.delete.title')}</h5>
        <div className="w-full flex gap-2.5 justify-center mt-4 pb-0.5">
          <Button
            variant="outline"
            className="w-[120px] h-[40px]"
            onClick={() => setOpenDeletePackageDialog(false)}
            disabled={isDeleting}
          >
            {t('common.buttons.cancel')}
          </Button>
          <Button
            variant="destructive"
            className="w-[120px] h-[40px]"
            loading={isDeleting}
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePackage();
            }}
          >
            {t('common.buttons.delete')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
