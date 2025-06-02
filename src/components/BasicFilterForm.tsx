'use client';

import { InputText } from '@/components/form/input';
import { Form } from '@/components/ui/form';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { Button } from './ui/button';
export function BasicFilterForm({
  form,
  onSubmit,
  searchBtn = false,
  children,
  isFiltering = false,
} : {
  form: UseFormReturn,
  onSubmit: (data: any) => Promise<void>,
  searchBtn?: boolean,
  isFiltering?: boolean,
  children?: React.ReactNode,
}) {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form className="flex gap-2.5 items-end justify-end mb-5 ms-[auto]" onSubmit={form.handleSubmit(onSubmit)}>
        {children}
        <InputText
          name="keyword"
          size="md"
          placeholder={t('common.searchPlaceholder')}
          className="max-w-[250px]"
          label=""
          control={form.control}
          suffixIcon={<SearchIcon size={22} />}
          onSuffixIconClick={form.handleSubmit(onSubmit)}
          isTrim={true}
        />
        {searchBtn && <Button 
          size="lg" 
          onClick={form.handleSubmit(onSubmit)}
          disabled={isFiltering}
        >{t('common.buttons.filter_view')}</Button>
        }
      </form>
    </Form>
  );
}
