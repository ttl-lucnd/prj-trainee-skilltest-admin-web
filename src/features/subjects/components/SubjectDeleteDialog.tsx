import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { useSubjectStore } from '../stores/useSubjectStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';
import { subjectService } from '../services/subject.service';
import { useState } from 'react';
import { IBodyResponse } from '@/utils/interfaces';
import { toast } from '@/hooks/use-toast';
export function SubjectDeleteDialog() {
  const t = useTranslations();
  const { selectedSubject, isOpenDeleteSubjectDialog, setOpenDeleteSubjectDialog, getSubjectList } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject,
      isOpenDeleteSubjectDialog: state.isOpenDeleteSubjectDialog,
      setOpenDeleteSubjectDialog: state.setOpenDeleteSubjectDialog,
      getSubjectList: state.getSubjectList,
    })),
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteSubject = async () => {
    setOpenDeleteSubjectDialog(false);
    if(isDeleting) return;
    setIsDeleting(true);
    try {
      const response: IBodyResponse<any> = await subjectService._delete(selectedSubject?.id ?? '');

      if(response.success) {
        toast({
          title: t('common.messages.delete_success'),
          variant: 'success',
        })
        await getSubjectList();
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
      open={isOpenDeleteSubjectDialog}
      onOpenChange={setOpenDeleteSubjectDialog}
      showCloseButton={false}
      className="max-w-[400px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <h5 className="font-bold">{t('subjects.delete.title')}</h5>
        <div className="w-full flex gap-2.5 justify-center mt-4">
          <Button variant="outline" className="w-[120px] h-[40px]" onClick={() => setOpenDeleteSubjectDialog(false)}>
            {t('common.buttons.cancel')}
          </Button>
          <Button variant="destructive" className="w-[120px] h-[40px]" onClick={(e) => {
            e.stopPropagation();
            handleDeleteSubject();
            }}>
            {t('common.buttons.delete')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
