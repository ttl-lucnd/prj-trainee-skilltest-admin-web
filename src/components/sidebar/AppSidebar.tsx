'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { AppMenu } from './AppMenu';
import { BrandSidebar } from './BrandSidebar';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-0">
        <BrandSidebar />
      </SidebarHeader>
      <SidebarContent className="w-[244px]">
        <AppMenu />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
