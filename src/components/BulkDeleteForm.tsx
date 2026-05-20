import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { IBodyResponse } from '@/utils/interfaces';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

export function BulkDeleteForm({
  title,
  deleteBtn,
  isOpen,
  setOpen,
  handleDelete,
  getData,
} : {
  readonly title: string,
  readonly deleteBtn: string,
  readonly isOpen: boolean,
  readonly setOpen: (open: boolean) => void,
  readonly handleDelete: () => Promise<IBodyResponse<any>>,
  readonly getData: () => Promise<void>,
}) {
  const t = useTranslations();

   const [isDeleting, setIsDeleting] = useState(false);
 
   const handleBulkDelete = async () => {
     setOpen(false);
     if(isDeleting) return;
     setIsDeleting(true);
 
     try {
       const response: IBodyResponse<any> = await handleDelete();
 
       if(response.success) {
                 
         toast({
           title: t('common.messages.delete_success'),
           variant: 'success',
         })
         await getData();
       }else {
         toast({
           title: t('common.messages.delete_failed'),
           variant:'destructive',
         })
       }
     }catch {
         toast({
           title: t('common.messages.error'),
           variant:'destructive',
         })
     }finally {
       setIsDeleting(false);
     }
   }
 
   return (
     <BaseDialog
       open={isOpen}
       onOpenChange={setOpen}
       showCloseButton={false}
       className="max-w-[400px]"
     >
       <div className="flex flex-col items-center justify-end gap-2.5 ">
         <h5 className="font-bold">{title}</h5>
         <div className="w-full flex gap-2.5 justify-center mt-4 pb-0.5">
           <Button variant="outline" className="w-[120px] h-[40px]" disabled={isDeleting} onClick={() => setOpen(false)}>
             {t('common.buttons.cancel')}
           </Button>
           <Button variant="destructive" className="w-[120px] h-[40px]" loading={isDeleting} onClick={handleBulkDelete}>
             {deleteBtn}
           </Button>
         </div>
       </div>
     </BaseDialog>
   );
}
