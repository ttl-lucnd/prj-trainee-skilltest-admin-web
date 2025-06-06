import { BaseDialog } from '@/components/BaseDialog';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';

export function VocabularyImageDetail() {
  const { selectedVocabulary, isOpenImageDetail, setOpenImageDetail } = useVocabularyStore(
    useShallow((state) => ({
      selectedVocabulary: state.selectedVocabulary,
      isOpenImageDetail: state.isOpenImageDetail,
      setOpenImageDetail: state.setOpenImageDetail,
    })),
  );

  return (
    <BaseDialog
      open={isOpenImageDetail}
      onOpenChange={setOpenImageDetail}
      showCloseButton={true}
      className="max-w-[700px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 mt-8">
        <Image
          src={selectedVocabulary?.image ?? ''}
          width={452}
          height={452}
          alt="vocabulary-image"
          className='max-h-[452px]'
        />
      </div>
    </BaseDialog>
  );
}
