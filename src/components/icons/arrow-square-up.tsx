import { IIconProps } from '@/utils/interfaces';

export function ArrowSquareUpIcon({ size = 10, className }: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="arrow-square-up-icon"
      >
        <path
          d="M6.25033 0.833414H3.75033C1.66699 0.833414 0.833658 1.66675 0.833658 3.75008V6.25008C0.833658 8.33341 1.66699 9.16675 3.75033 9.16675H6.25033C8.33366 9.16675 9.16699 8.33341 9.16699 6.25008V3.75008C9.16699 1.66675 8.33366 0.833414 6.25033 0.833414Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.4707 5.56665L4.99987 4.09998L3.52904 5.56665"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
