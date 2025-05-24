import { BaseDialog } from '@/components/BaseDialog';
import { useQuestionStore } from '../stores/useQuestionStore';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';

export function QuestionImageDetail() {
  const { selectedQuestion, isOpenImageDetail, setOpenImageDetail } = useQuestionStore(
    useShallow((state) => ({
      selectedQuestion: state.selectedQuestion,
      isOpenImageDetail: state.isOpenImageDetail,
      setOpenImageDetail: state.setOpenImageDetail,
    })),
  );

  return (
    <BaseDialog
      open={isOpenImageDetail}
      onOpenChange={setOpenImageDetail}
      showCloseButton={true}
      className="max-w-[452px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 mt-4">
        <Image
          src={selectedQuestion?.image ?? ''}
          width={452}
          height={452}
          alt="question-image"
        />
      </div>
    </BaseDialog>
  );
}
