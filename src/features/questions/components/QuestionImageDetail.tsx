import { BaseDialog } from '@/components/BaseDialog';
import { useQuestionStore } from '../stores/useQuestionStore';
import { useShallow } from 'zustand/react/shallow';
import { useState } from 'react';
import { LoadingCircleIcon } from '@/components/icons';
import Image from 'next/image';

export function QuestionImageDetail() {
  const { selectedQuestion, isOpenImageDetail, setOpenImageDetail } = useQuestionStore(
    useShallow((state) => ({
      selectedQuestion: state.selectedQuestion,
      isOpenImageDetail: state.isOpenImageDetail,
      setOpenImageDetail: state.setOpenImageDetail,
    })),
  );

  const [loadingQuestionImage, setLoadingQuestionImage] = useState(true);

  return (
    <BaseDialog
      open={isOpenImageDetail}
      onOpenChange={(open) => {
        setOpenImageDetail(open);
        if (open) setLoadingQuestionImage(true);
      }}
      showCloseButton={true}
      className="max-w-[700px]"
    >
      <div className="relative flex flex-col items-center justify-center gap-2.5 mt-8 min-h-[200px]">
        {loadingQuestionImage && 
        <LoadingCircleIcon className="animate-spin text-primary-2 absolute top-[calc(50%-12px)] left-[calc(50%-12px)] z-10" size={24} />
        }
        <Image
          key={selectedQuestion?.image ?? ''}
          src={selectedQuestion?.image ?? ''}
          width={452}
          height={452}
          alt="question-image"
          className='max-h-[452px]'
          onLoad={() => setLoadingQuestionImage(false)}
          onError={() => setLoadingQuestionImage(false)}
        />
      </div>
    </BaseDialog>
  );
}
