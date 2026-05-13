import { IIconProps } from '@/utils/interfaces';

export function DangerCircleIcon({ size = 24, className }: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.00065 1.83203C11.406 1.83203 14.1673 4.5927 14.1673 7.9987C14.1673 11.404 11.406 14.1654 8.00065 14.1654C4.59465 14.1654 1.83398 11.404 1.83398 7.9987C1.83398 4.5927 4.59465 1.83203 8.00065 1.83203Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.9974 5.46875V8.41475"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.99797 10.5286H8.00464"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
