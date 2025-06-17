import { BaseDialog } from '@/components/BaseDialog';
import { useVocabularyStore } from '../stores/useVocabularyStore';
import { useShallow } from 'zustand/react/shallow';
import { LoadingCircleIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function VocabularyImageDetail() {
  const { selectedVocabulary, isOpenImageDetail, setOpenImageDetail } = useVocabularyStore(
    useShallow((state) => ({
      selectedVocabulary: state.selectedVocabulary,
      isOpenImageDetail: state.isOpenImageDetail,
      setOpenImageDetail: state.setOpenImageDetail,
    })),
  );

  const [loading, setLoading] = useState(true);

  return (
    <BaseDialog
      open={isOpenImageDetail}
      onOpenChange={(open) => {
        setOpenImageDetail(open);
        if (open) setLoading(true);
      }}
      showCloseButton={true}
      className="max-w-[700px]"
    >
      <div className={cn("flex flex-col items-center justify-end gap-2.5 mt-8", loading && 'realative w-[700px] h-[452px]')}>
        {loading && 
        <div className='absolute inset-0 flex items-center justify-center z-10'>
        <LoadingCircleIcon className="animate-spin text-primary-2 " size={24} />
        </div>
        }
        <img
          key={selectedVocabulary?.image ?? ''}
          src={selectedVocabulary?.image ?? ''}
          width={452}
          height={452}
          alt="vocabulary-image"
          className='max-h-[452px]'
          loading='lazy'
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
    </BaseDialog>
  );
}
