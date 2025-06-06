import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { useQuestionStore } from '../stores/useQuestionStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';
import { questionService } from '../services/question.service';
import { toast } from '@/hooks/use-toast';
import { IBodyResponse } from '@/utils/interfaces';
import { useState } from 'react';
export function QuestionDeleteDialog() {
  const t = useTranslations();
  const { 
    selectedQuestion, 
    isOpenDeleteQuestionDialog, 
    setOpenDeleteQuestionDialog, 
    getQuestionList,
  } = useQuestionStore(
    useShallow((state) => ({
      selectedQuestion: state.selectedQuestion,
      isOpenDeleteQuestionDialog: state.isOpenDeleteQuestionDialog,
      setOpenDeleteQuestionDialog: state.setOpenDeleteQuestionDialog,
      getQuestionList: state.getQuestionList,
    })),
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteQuestion = async () => {
    setOpenDeleteQuestionDialog(false);
    if(isDeleting) return;
    setIsDeleting(true);

    try {
      const response: IBodyResponse<any> = await questionService._delete(selectedQuestion?.id ?? '');

      if(response.success) {
                
        toast({
          title: t('common.messages.delete_success'),
          variant: 'success',
        })
        await getQuestionList();
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
      open={isOpenDeleteQuestionDialog}
      onOpenChange={setOpenDeleteQuestionDialog}
      showCloseButton={false}
      className="max-w-[400px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <h5 className="font-bold">{t('questions.delete.title')}</h5>
        <div className="w-full flex gap-2.5 justify-center mt-4">
          <Button variant="outline" className="w-[120px] h-[40px]" onClick={() => setOpenDeleteQuestionDialog(false)}>
            {t('common.buttons.cancel')}
          </Button>
          <Button variant="destructive" className="w-[120px] h-[40px]" onClick={handleDeleteQuestion}>
            {t('common.buttons.delete')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
