'use client';

import { Control, useWatch } from 'react-hook-form';
import { FormField, FormItem } from '../ui/form';
import { FormFieldLayout } from './form-field-layout';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { GalleryUpIcon, LoadingCircleIcon } from '../icons';
import { useCallback, useRef } from 'react';
import { DEFAULT_MAX_SIZE } from '@/utils/constants';
import Image from 'next/image';

export type ValidationErrorType = 'max_size' | 'invalid_file_type';
export type FileUploadStatus = 'start_upload' | 'uploading' | 'done' | 'failed';
interface UploadFieldProps {
  label?: string;
  name: string;
  description?: string;
  accept?: string;
  maxSize?: number;
  required?: boolean;
  control: Control<any>;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  onChange?: (file: File) => void;
  onRemove?: (file?: File | null) => void;
  onValidationFail?: (errorType: ValidationErrorType) => void;
  allowClear?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export function UploadField({
  label,
  name,
  description,
  accept = 'image/*',
  maxSize = DEFAULT_MAX_SIZE, // MB
  required = false,
  control,
  layout = 'horizontal',
  className,
  onChange,
  onRemove,
  onValidationFail,
  allowClear = true,
  disabled = false,
  loading = false,
}: Readonly<UploadFieldProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  const imageUrl = useWatch({ control, name });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      onValidationFail?.('max_size');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return;
    }

    // Check file type
    const fileType = file.type;
    const lastIndex = -2;
    if (
      !accept.split(',').some((type) => {
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.slice(0, lastIndex));
        }
        return fileType === type;
      })
    ) {
      onValidationFail?.('invalid_file_type');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
    onChange?.(file);
  };

  const uploadFieldImage = useCallback(() => {
    return imageUrl 
      ? <div className="w-full aspect-square relative">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 border border-primary rounded-lg pointer-events-none" />
        </div>
      : <div className="flex flex-col items-center justify-center gap-2">
        <GalleryUpIcon size={20} />
      </div>
  }, [imageUrl])

  return (
    <FormField
      control={control}
      name={name}
      render={({ fieldState: { error: fieldError } }) => (
        <FormItem className={className}>
          <FormFieldLayout
            label={label}
            required={required}
            layout={layout}
            hasError={!!fieldError}
            errorMessage={fieldError?.message}
            description={description}
          >
            <div className={cn(
              "flex gap-2 overflow-hidden pt-0.5",
            )}>
              <button
                type="button"
                data-testid="upload-area"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled && inputRef.current) {
                    inputRef.current.click();
                  }
                }}
                className={cn(
                  'w-full text-center bg-white aspect-square border rounded-lg relative group',
                  fieldError && 'border-destructive',
                  disabled && 'cursor-not-allowed opacity-50',
                  !imageUrl && 'border-dashed border-primary'
                )}
              >
                <input
                  ref={inputRef}
                  data-testid="file-input"
                  type="file"
                  accept={accept}
                  className="hidden"
                  id={name}
                  onChange={handleFileChange}
                  aria-label={t('common.file.upload')}
                  disabled={disabled}
                />
                {loading ? <LoadingCircleIcon size={16} className="animate-spin" /> : 
                <div
                  className={cn(
                    'cursor-pointer',
                    disabled && 'cursor-not-allowed opacity-50',
                  )}
                  aria-disabled={disabled}
                >
                  {uploadFieldImage()}
                </div>
                }
                {(imageUrl && allowClear) && (
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <div className="bg-black/60 p-1 rounded-full">
                  <X
                    size={16}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove?.();
                      if (inputRef.current) {
                        inputRef.current.value = '';
                      }
                    }}
                    className="cursor-pointer text-white"
                    data-testid="remove-file-button"
                    aria-label={t('common.buttons.clear')}
                  />
                  </div>
                  </div>
                  )}
              </button>
            </div>
          </FormFieldLayout>
        </FormItem>
      )}
    />
  );
}
