import { CollapseIcon } from '../icons/collapse';
import { useSidebar } from '../ui/sidebar';
import { cn } from '@/lib/utils';

export function BrandSidebar() {
  const {open,  toggleSidebar } = useSidebar();

  return (
    <div className={cn("flex justify-end items-center px-4 mt-4 mb-3", !open && 'py-2.5 justify-center')}>
      <button  
      className="size-10 flex items-center justify-center text-secondary-1 hover:text-primary-1"
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
