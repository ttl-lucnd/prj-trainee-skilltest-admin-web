import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslations } from 'next-intl';
import { vocabularyService } from '../services/vocabulary.service';
import { toast } from '@/hooks/use-toast';
import { IBodyResponse } from '@/utils/interfaces';
import { useState } from 'react';
export function VocabularyDeleteDialog() {
  const t = useTranslations();
  const { 
    selectedVocabulary, 
    isOpenDeleteVocabularyDialog, 
    setOpenDeleteVocabularyDialog, 
    getVocabularyList,
  } = useVocabularyStore(
    useShallow((state) => ({
      selectedVocabulary: state.selectedVocabulary,
      isOpenDeleteVocabularyDialog: state.isOpenDeleteVocabularyDialog,
      setOpenDeleteVocabularyDialog: state.setOpenDeleteVocabularyDialog,
      getVocabularyList: state.getVocabularyList,
    })),
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteVocabulary = async () => {
    setOpenDeleteVocabularyDialog(false);
    if(isDeleting) return;
    setIsDeleting(true);

    try {
      const response: IBodyResponse<any> = await vocabularyService._delete(selectedVocabulary?.id ?? '');

      if(response.success) {
                
        toast({
          title: t('common.messages.delete_success'),
          variant: 'success',
        })
        await getVocabularyList();
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
      open={isOpenDeleteVocabularyDialog}
      onOpenChange={setOpenDeleteVocabularyDialog}
      showCloseButton={false}
      className="max-w-[400px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <h5 className="font-bold">{t('vocabularies.delete.title')}</h5>
        <div className="w-full flex gap-2.5 justify-center mt-4 pb-0.5">
          <Button variant="outline" className="w-[120px] h-[40px]" onClick={() => setOpenDeleteVocabularyDialog(false)} disabled={isDeleting}>
            {t('common.buttons.cancel')}
          </Button>
          <Button variant="destructive" className="w-[120px] h-[40px]" loading={isDeleting} onClick={(e) => {
            e.stopPropagation();
            handleDeleteVocabulary()}
            }>
            {t('common.buttons.delete')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
