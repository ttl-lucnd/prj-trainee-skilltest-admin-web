import { UserCircleIcon } from '@/components/icons';
import { LogOutIcon } from '@/components/icons/log-out';
import { useSidebar } from '@/components/ui/sidebar';
import { PageRouter } from '@/utils/constants';
import { removeAllCookies } from '@/utils/cookies';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { authService } from '../services/auth.service';
import { cn } from '@/lib/utils';

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
  }, []);

  return (
    <button
      onClick={logout}
      disabled={isLoggingOut}
      className={cn(
        'w-full flex items-center justify-between hover:bg-accent rounded-none px-6 py-3.5',
        !open && 'justify-center',
      )}
    >
      <UserCircleIcon size={40} className={cn(!open && 'hidden')} />
      <span className={cn(!open && 'hidden')}>{t('sidebar.logout')}</span>
      <LogOutIcon size={20} className="py-2.5" />
    </button>
  );
}
