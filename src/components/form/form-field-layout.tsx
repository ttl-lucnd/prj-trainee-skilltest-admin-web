import { cn } from '@/lib/utils';
import { FormDescription, FormLabel } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { parseErrorMessage } from '@/utils';

interface FormFieldLayoutProps {
  label?: string | React.ReactNode;
  required?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  hasError?: boolean;
  description?: string;
  errorMessage?: string;
  classNameLabel?: string;
  children: React.ReactNode;
}

export function FormFieldLayout({
  label,
  required = false,
  layout = 'horizontal',
  className,
  hasError,
  description,
  errorMessage,
  children,
  classNameLabel,
}: Readonly<FormFieldLayoutProps>) {
  const t = useTranslations();

  return (
    <div
      className={cn(
        'flex',
        label ? 'items-center gap-2' : 'flex-1',
        layout === 'vertical' && 'w-full flex-col items-start',
        'rounded-md border border-border focus-within:ring-1 focus-within:ring-primary-2 focus-within:border-primary-2',
        className,
      )}
    >
      {label && (
        <FormLabel
          className={cn(
            'min-w-[140px] text-left w-2/9 mt-2 text-body-md',
            hasError && '!text-destructive text-body-md',
            layout === 'horizontal' && 'self-center',
            classNameLabel,
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FormLabel>
      )}
      <div className="flex-1 w-full overflow-x-hidden">
        {children}
        {description && <FormDescription>{description}</FormDescription>}
        {hasError && errorMessage && (
          <p className="text-body-sm text-destructive mt-0.5">
            {parseErrorMessage(t, errorMessage)}
          </p>
        )}
      </div>
    </div>
  );
}
