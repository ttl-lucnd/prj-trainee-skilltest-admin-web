import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { usePackageStore } from '../../stores/usePackageStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';
export function PackageMessageDialog() {
  const t = useTranslations();
  const { isOpenPackageMessageDialog, setOpenPackageMessageDialog } = usePackageStore(
    useShallow((state) => ({
      isOpenPackageMessageDialog: state.isOpenPackageMessageDialog,
      setOpenPackageMessageDialog: state.setOpenPackageMessageDialog,
    })),
  );

  return (
    <BaseDialog
      open={isOpenPackageMessageDialog}
      onOpenChange={setOpenPackageMessageDialog}
      showCloseButton={false}
      className="max-w-[400px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <h5 className="font-bold text-center">{t('packages.delete.error')}</h5>
        <div className="w-full flex gap-2.5 justify-center mt-4 pb-0.5">
          <Button
            variant="outline"
            className="w-[120px]"
            onClick={() => setOpenPackageMessageDialog(false)}
          >
            {t('common.buttons.cancel')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
