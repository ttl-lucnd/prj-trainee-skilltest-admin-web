import { BaseDialog } from '@/components/BaseDialog';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { useShallow } from 'zustand/react/shallow';

export function VocabularyDescriptionDetail() {
  const { selectedDescription, isOpenDescriptionDetail, setOpenDescriptionDetail } = useVocabularyStore(
    useShallow((state) => ({
      selectedDescription: state.selectedDescription,
      isOpenDescriptionDetail: state.isOpenDescriptionDetail,
      setOpenDescriptionDetail: state.setOpenDescriptionDetail,
    })),
  );

  return (
    <BaseDialog
      open={isOpenDescriptionDetail}
      onOpenChange={setOpenDescriptionDetail}
      showCloseButton={true}
      className="max-w-[500px] max-h-[452px]"
    >
      <div className="flex flex-wrap items-center justify-start gap-2.5 mt-8 overflow-auto">
        {selectedDescription}
      </div>
    </BaseDialog>
  );
}
