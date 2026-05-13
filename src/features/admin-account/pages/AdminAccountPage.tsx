'use client';

import { AdminAccountList } from '../components/AdminAccountList';
import { AdminFilterForm } from '../components/AdminFilterForm';
import { AdminDeleteDialog } from '../components/AdminDeleteDialog';
import { AdminForm } from '../components/AdminForm';
export function AdminAccountPage() {
  
  return (
    <>
      <AdminFilterForm />
      <AdminAccountList />
      <AdminDeleteDialog />
      <AdminForm />
    </>
  );
}
