import { StarIcon, UserGroupIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { PageRouter } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '../ui/sidebar';

const items = [
  {
    icon: StarIcon,
    title: 'sidebar.quiz_management',
    path: PageRouter.QUIZ_MANAGEMENT,
  },
  {
    icon: StarIcon,
    title: 'sidebar.word_management',
    path: PageRouter.WORD_MANAGEMENT,
  },
  {
    title: 'sidebar.admin_account',
    icon: UserGroupIcon,
    path: PageRouter.ADMIN_ACCOUNTS,
  },
];

export function AppMenu() {
  const { open } = useSidebar();
  const pathname = usePathname();
  const t = useTranslations();

  const isActive = useCallback(
    (url: string): boolean => {
      if (!url || url === '#') return false;
      const normalizedTarget = url.endsWith('/') ? url : `${url}/`;
      const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
      return normalizedPathname.startsWith(normalizedTarget);
    },
    [pathname],
  );
  return (
    <SidebarMenu className={cn('px-4', !open && 'px-5')}>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={isActive(item.path)}>
            <Link href={item.path}>
              <item.icon />
              <span>{t(`${item.title}`)}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
