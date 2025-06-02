import { BaseDialog } from '@/components/BaseDialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { toast } from '@/hooks/use-toast';
import { IBodyResponse } from '@/utils/interfaces';
import { useState } from 'react';
export function SyncDataDialog({
  isOpenSyncDataDialog,
  setOpenSyncDataDialog,
  getSetting,
  handleSync,
} : {
  isOpenSyncDataDialog: boolean,
  setOpenSyncDataDialog: (open: boolean) => void,
  getSetting: () => Promise<void>,
  handleSync: () => Promise<IBodyResponse<any>>,
}) {
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState(false);

  const handleSyncData = async () => {
    if(isLoading) return;
    setIsLoading(true);
    
    try {
      setOpenSyncDataDialog(false);
      const response  = await handleSync();
      await getSetting();

      if(response.success) {
        
        toast({
          title: t('common.messages.data_sync'),
          variant: 'success',
        })
      }else {
        toast({
          title: t('common.messages.error'),
          variant:'destructive',
        })
      }
    }catch {
        toast({
          title: t('common.messages.error'),
          variant:'destructive',
        })
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <BaseDialog
      open={isOpenSyncDataDialog}
      onOpenChange={setOpenSyncDataDialog}
      showCloseButton={false}
      className="max-w-[953px]"
    >
      <div className="flex flex-col items-center justify-end gap-2.5 ">
        <h5 className="font-bold text-[#E9034E]">{t('common.sync_data_alert')}</h5>
        <div className="w-full flex gap-2.5 justify-center mt-6">
          <Button variant="outline" className="w-[120px] h-[40px]" onClick={() => setOpenSyncDataDialog(false)}>
            {t('common.buttons.cancel')}
          </Button>
          <Button className="w-[120px] h-[40px]" onClick={() => handleSyncData()}>
            {t('common.buttons.ok')}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
