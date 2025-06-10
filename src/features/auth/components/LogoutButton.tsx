import { LogOut2Icon } from '@/components/icons';
import { useSidebar } from '@/components/ui/sidebar';
import { PageRouter } from '@/utils/constants';
import { removeAllCookies } from '@/utils/cookies';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { authService } from '../services/auth.service';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export function LogoutButton() {
  const router = useRouter();
  const t = useTranslations();
  const { open } = useSidebar();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    await authService.logout();
    removeAllCookies();
    router.push(PageRouter.LOGIN);
    toast({
      title: t(`common.messages.logout_success`),
      variant: 'success',
    })
  }, [toast]);

  return (
    <button
      onClick={logout}
      disabled={isLoggingOut}
      className={cn(
        'w-full flex items-center justify-start hover:bg-accent rounded-none px-10 py-3.5 text-[#FF0053] transition-width duration-200',
        !open && 'justify-center flex-col px-2',
      )}
    >
      <LogOut2Icon size={20} className="py-2.5 mx-[20px]" />
      <span>{t('sidebar.logout')}</span>
    </button>
  );
}
