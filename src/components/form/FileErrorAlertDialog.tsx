import { useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { CircleAlertIcon } from 'lucide-react';

interface IProps {
  open: boolean;
  maxSize?: number;
  onOpenChange?: (open: boolean) => void;
  message?: string;
}

export const FileErrorAlertDialog = ({
  open,
  maxSize,
  onOpenChange,
  message,
}: IProps) => {
  const t = useTranslations();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col items-center gap-6">
          <CircleAlertIcon className="w-12 h-12" data-testid="circle-alert-icon" />
          <h4 className="font-semibold">
            {t(message ?? 'common.file_size_exceeded', { maxSize: maxSize ?? 10 })}
          </h4>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="mx-auto">
            {t('common.buttons.close')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
