import { IIconProps } from '@/utils/interfaces';

export function ArrowSquareUpIcon({ size = 10, className }: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 10 10"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="arrow-square-up-icon"
      >
        <path
          d="M1.5 7.5
            Q1 7.5 1.3 7.1
            L4.8 2.5
            Q5 2.2 5.2 2.5
            L8.7 7.1
            Q9 7.5 8.5 7.5
            Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
