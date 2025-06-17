import { BaseDialog } from '@/components/BaseDialog';
import { useShallow } from 'zustand/react/shallow';
import { useSubjectStore } from '../stores/useSubjectStore';
import { useState } from 'react';
import { LoadingCircleIcon } from '@/components/icons';
import Image from 'next/image';

export function SubjectImageDetail() {
  const { selectedImage, isOpenImageDetail, setOpenImageDetail } = useSubjectStore(
    useShallow((state) => ({
      selectedImage: state.selectedImage,
      isOpenImageDetail: state.isOpenImageDetail,
      setOpenImageDetail: state.setOpenImageDetail,
    })),
  );
  
  const [loadingSubjectImage, setLoadingSubjectImage] = useState(true);

  return (
    <BaseDialog
      open={isOpenImageDetail}
      onOpenChange={(open) => {
        setOpenImageDetail(open);
        if (open) setLoadingSubjectImage(true);
      }}
      showCloseButton={true}
      className="max-w-[700px]"
    >
      <div className="relative flex flex-col items-center justify-end gap-2.5 mt-8 min-h-[200px]">
        {loadingSubjectImage && 
        <LoadingCircleIcon className="animate-spin text-primary-2 absolute top-[calc(50%-12px)] left-[calc(50%-12px)] z-10" size={24} />
        }
        <Image
          key={selectedImage ?? ''}
          src={selectedImage ?? ''}
          width={452}
          height={452}
          alt="subject-image"
          className='max-h-[452px]'
          onLoad={() => setLoadingSubjectImage(false)}
          onError={() => setLoadingSubjectImage(false)}
        />
      </div>
    </BaseDialog>
  );
}
