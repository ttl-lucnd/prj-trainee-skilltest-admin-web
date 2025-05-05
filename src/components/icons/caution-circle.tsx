import { IIconProps } from '@/utils/interfaces';
export function CautionCircleIcon({ size = 24, className }: Readonly<IIconProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.9987 1.83203C11.404 1.83203 14.1654 4.5927 14.1654 7.9987C14.1654 11.404 11.404 14.1654 7.9987 14.1654C4.5927 14.1654 1.83203 11.404 1.83203 7.9987C1.83203 4.5927 4.5927 1.83203 7.9987 1.83203Z"
        stroke="#9BA5B7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99349 5.46875V8.41475"
        stroke="#9BA5B7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99406 10.5286H8.00073"
        stroke="#9BA5B7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
