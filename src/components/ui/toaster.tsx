import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { BadgeCheckIcon, XCircleIcon } from '../icons';

interface IProps {
  description?: React.ReactNode;
}

export function Toaster({ description }: Readonly<IProps>) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description: toastDescription,
        action,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {(toastDescription || description) && (
                <ToastDescription className="flex items-center gap-2.5">
                  {props.variant === 'success' && (
                    <BadgeCheckIcon className="text-status-success" />
                  )}
                  {props.variant === 'destructive' && (
                    <XCircleIcon className="text-status-error" />
                  )}
                  {description || toastDescription}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
