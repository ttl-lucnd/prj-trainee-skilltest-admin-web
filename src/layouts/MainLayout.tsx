import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function MainLayoutWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <TooltipProvider>{children}</TooltipProvider>
    </SidebarProvider>
  );
}
