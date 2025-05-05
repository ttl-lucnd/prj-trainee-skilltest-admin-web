'use client';

import { Control } from 'react-hook-form';
import { FormField, FormItem } from '../ui/form';
import { FormFieldLayout } from './form-field-layout';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { UploadCloudIcon, X } from 'lucide-react';
import { IFile } from '@/features/common/interface';
import { GalleryUpIcon, LoadingCircleIcon } from '../icons';
import { useRef } from 'react';
import { DEFAULT_MAX_SIZE } from '@/utils/constants';

export type ValidationErrorType = 'max_size' | 'invalid_file_type';
export type FileUploadStatus = 'start_upload' | 'uploading' | 'done' | 'failed';
interface UploadFieldProps {
  label?: string;
  name: string;
  description?: string;
  placeholder?: string;
  accept?: string;
  maxSize?: number;
  required?: boolean;
  control: Control<any>;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  onChange?: (file: File) => void;
  onRemove?: (file?: IFile | null) => void;
  onValidationFail?: (errorType: ValidationErrorType) => void;
  fileList?: (IFile | null | undefined)[];
  allowClear?: boolean;
  disabled?: boolean;
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
  fileList,
  allowClear = true,
  disabled = false,
}: Readonly<UploadFieldProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

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
            <div className="flex flex-col gap-2">
              <button
                type="button"
                data-testid="upload-area"
                disabled={disabled}
                onClick={() => {
                  if (!disabled && inputRef.current) {
                    inputRef.current.click();
                  }
                }}
                className={cn(
                  'w-full border border-dashed border-primary rounded-lg p-4 text-center bg-white',
                  fieldError && 'border-destructive',
                  disabled && 'cursor-not-allowed opacity-50',
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
                <div
                  className={cn(
                    'cursor-pointer',
                    disabled && 'cursor-not-allowed opacity-50',
                  )}
                  aria-disabled={disabled}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-gray-100 p-[11px]">
                      <GalleryUpIcon size={20} />
                    </div>

                    <div className="text-xs text-secondary-foreground">
                      {t('common.file.max_size', { maxSize })}
                    </div>
                    <div
                      className={cn(
                        'flex items-center gap-2.5 cursor-pointer bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary/80 px-4 py-1.5 rounded-lg',
                        disabled && 'bg-button-secondary cursor-not-allowed',
                      )}
                    >
                      <UploadCloudIcon />
                      <span>{t('common.file.upload')}</span>
                    </div>
                  </div>
                </div>
              </button>
              {fileList && fileList.length > 0 && (
                <div className="flex flex-col gap-0">
                  {fileList.map((file) => (
                    <div
                      key={`${file?.s3Key ?? file?.storedName ?? file?.originalName}`}
                      className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg"
                    >
                      <div className="truncate">{file?.originalName}</div>
                      <div className="flex items-center gap-2">
                        {(file?.status === 'uploading' ||
                          file?.status === 'start_upload') && (
                          <LoadingCircleIcon size={16} className="animate-spin" />
                        )}
                        {allowClear && (
                          <X
                            size={16}
                            onClick={() => {
                              onRemove?.(file);
                              if (inputRef.current) {
                                inputRef.current.value = '';
                              }
                            }}
                            className="cursor-pointer"
                            data-testid="remove-file-button"
                            aria-label={t('common.buttons.clear')}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormFieldLayout>
        </FormItem>
      )}
    />
  );
}
