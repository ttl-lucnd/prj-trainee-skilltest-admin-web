import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

export function BaseDialog({
  open,
  title = '',
  description = '',
  children,
  className,
  showCloseButton,
  onOpenChange,
  headerClassName = 'hidden',
}: Readonly<{
  open: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onOpenChange?: (open: boolean) => void;
  headerClassName?: string,
}>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'p-0 pb-6 pt-3 gap-0 overflow-hidden',
          className,
        )}
        showCloseButton={showCloseButton}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        
      >

        <DialogHeader className={cn("px-6", headerClassName)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="max-h-full flex-1 overflow-y-auto px-6 pt-2 relative">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
