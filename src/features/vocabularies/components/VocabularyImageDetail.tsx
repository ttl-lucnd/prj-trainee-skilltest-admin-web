import { BaseDialog } from '@/components/BaseDialog';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { useShallow } from 'zustand/react/shallow';
import { LoadingCircleIcon } from '@/components/icons';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function VocabularyImageDetail() {
  const { selectedVocabulary, isOpenImageDetail, setOpenImageDetail } = useVocabularyStore(
    useShallow((state) => ({
      selectedVocabulary: state.selectedVocabulary,
      isOpenImageDetail: state.isOpenImageDetail,
      setOpenImageDetail: state.setOpenImageDetail,
    })),
  );

  const [loadingVocabularyImage, setLoadingVocabularyImage] = useState(true);

  useEffect(()=> {
    if(isOpenImageDetail) {
      setLoadingVocabularyImage(isOpenImageDetail)
    }
  },[isOpenImageDetail])

  return (
    <BaseDialog
      open={isOpenImageDetail}
      onOpenChange={setOpenImageDetail}
      showCloseButton={true}
      className="max-w-[700px]"
    >
      <div className="flex flex-col items-center justify-center gap-2.5 mt-8 min-h-[200px]">
        {loadingVocabularyImage && 
        <LoadingCircleIcon className="animate-spin text-primary-2 absolute top-[calc(50%-12px)] left-[calc(50%-12px)] z-10" size={48} />
        }
        <Image
          key={selectedVocabulary?.image ?? ''}
          src={selectedVocabulary?.image ?? ''}
          width={452}
          height={452}
          alt="vocabulary-image"
          className='max-h-[452px]'
          onLoad={() => setLoadingVocabularyImage(false)}
          onError={() => setLoadingVocabularyImage(false)}
        />
      </div>
    </BaseDialog>
  );
}
