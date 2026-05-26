'use client';

import { SaleDetailList } from '../components/sale-detail/SaleDetailList';
import { SaleDetailFilterForm } from '../components/sale-detail/SaleDetailFilterForm';

export function SaleDetailPage() {
  return (
    <>
      <SaleDetailFilterForm />
      <SaleDetailList />
    </>
  );
}
