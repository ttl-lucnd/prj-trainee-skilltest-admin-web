import { BaseDialog } from '@/components/BaseDialog';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { useSubjectStore } from '../stores/useSubjectStore';

export function SubjectImageDetail() {
  const { selectedImage, isOpenImageDetail, setOpenImageDetail } = useSubjectStore(
    useShallow((state) => ({
      selectedImage: state.selectedImage,
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
          src={selectedImage ?? ''}
          width={452}
          height={452}
          alt="subject-image"
          className='max-h-[452px]'
        />
      </div>
    </BaseDialog>
  );
}
