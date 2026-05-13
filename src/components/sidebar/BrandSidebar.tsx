import { redirect } from 'next/navigation';
import { AppNameIcon, LogoIcon } from '../icons';
import { CollapseIcon } from '../icons/collapse';
import { useSidebar } from '../ui/sidebar';
import { cn } from '@/lib/utils';
import { PageRouter } from '@/utils';

export function BrandSidebar() {
  const {open,  toggleSidebar } = useSidebar();

  return (
    <div className={cn("flex justify-between items-center my-6 py-2.5 transition-width duration-200", !open ? 'gap-2 px-2' : 'px-4')}>
      <div className={cn('flex items-center justify-start gap-2.5 overflow-hidden', open && 'flex-1')}>
        <button className='flex items-center justify-center cursor-pointer size-10' onClick={() => redirect(PageRouter.QUIZ_MANAGEMENT)}>
        <LogoIcon/>
        </button>
        {open && <AppNameIcon className={cn('fade', open? 'fade-in' : 'fade-out')}/>}
      </div>
      <button  
      className="flex items-center justify-center text-secondary-1 hover:bg-accent p-1 rounded-md"
      data-sidebar="trigger"
      data-testid="sidebar-trigger"
      onClick={() => {
        toggleSidebar();
      }}>
        <CollapseIcon size={32} className=''/>
      </button>
    </div>
  );
}
