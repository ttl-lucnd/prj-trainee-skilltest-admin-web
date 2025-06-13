import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { useSubjectStore } from '../stores/useSubjectStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';
export function SubjectMessageDialog() {
  const t = useTranslations();
  const { isOpenSubjectMessageDialog, setOpenSubjectMessageDialog } = useSubjectStore(
    useShallow((state) => ({
      isOpenSubjectMessageDialog: state.isOpenSubjectMessageDialog,
      setOpenSubjectMessageDialog: state.setOpenSubjectMessageDialog,
    })),
  );

  return (
    <BaseDialog
      open={isOpenSubjectMessageDialog}
      onOpenChange={setOpenSubjectMessageDialog}
      showCloseButton={false}
      className="max-w-[400px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <h5 className="font-bold text-center">{t('subjects.delete.error')}</h5>
        <div className="w-full flex gap-2.5 justify-center mt-4 pb-0.5">
          <Button variant="outline" className="w-[120px]" onClick={() => setOpenSubjectMessageDialog(false)}>
            {t('common.buttons.cancel')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
