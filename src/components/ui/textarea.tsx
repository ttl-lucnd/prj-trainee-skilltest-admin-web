import * as React from 'react';
import { cn } from '@/lib/utils';
import { CloseIcon } from '../icons';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  allowClear?: boolean;
  resizable?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, allowClear, value, onChange, resizable, ...props }, ref) => {
    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault();
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = '';
      }
      onChange?.({
        target: { value: '' },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    };

    return (
      <div className="relative">
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-primary-2 bg-white px-3 py-2 text-base text-textDefaultColor ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-8',
            className,
            !resizable && 'resize-none',
          )}
          ref={ref}
          value={value}
          onChange={onChange}
          {...props}
        />
        {allowClear &&
          value && ( // Show clear button if allowClear is true and there is a value
            <button
              className="cursor-pointer absolute top-4 right-4 transform -translate-y-1/2 text-textDefaultColor"
              onClick={handleClear}
            >
              <CloseIcon size={20} />
            </button>
          )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
