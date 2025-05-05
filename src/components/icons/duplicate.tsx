import { IIconProps } from '@/utils/interfaces';

export function DuplicateIcon({ size = 24, className }: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.33268 14.668H5.49935C4.48683 14.668 3.66602 13.8472 3.66602 12.8346V5.5013C3.66602 4.48878 4.48683 3.66797 5.49935 3.66797H12.8327C13.8452 3.66797 14.666 4.48878 14.666 5.5013V7.33464M9.16602 18.3346H16.4993C17.5119 18.3346 18.3327 17.5138 18.3327 16.5013V9.16797C18.3327 8.15545 17.5119 7.33464 16.4993 7.33464H9.16602C8.15349 7.33464 7.33268 8.15545 7.33268 9.16797V16.5013C7.33268 17.5138 8.15349 18.3346 9.16602 18.3346Z"
          stroke="#545F71"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
