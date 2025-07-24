import { IIconProps } from '@/utils/interfaces';

export function SubscriptionIcon({ size = 24, className }: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
      >
        <g clipPath="url(#clip0_2430_4755)">
          <path
            d="M9.99996 18.3337C14.6023 18.3337 18.3333 14.6027 18.3333 10.0003C18.3333 5.39795 14.6023 1.66699 9.99996 1.66699C5.39759 1.66699 1.66663 5.39795 1.66663 10.0003C1.66663 14.6027 5.39759 18.3337 9.99996 18.3337Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3333 6.66699H8.33329C7.89127 6.66699 7.46734 6.84259 7.15478 7.15515C6.84222 7.46771 6.66663 7.89163 6.66663 8.33366C6.66663 8.77569 6.84222 9.19961 7.15478 9.51217C7.46734 9.82473 7.89127 10.0003 8.33329 10.0003H11.6666C12.1087 10.0003 12.5326 10.1759 12.8451 10.4885C13.1577 10.801 13.3333 11.225 13.3333 11.667C13.3333 12.109 13.1577 12.5329 12.8451 12.8455C12.5326 13.1581 12.1087 13.3337 11.6666 13.3337H6.66663"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 15V5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2430_4755">
            <rect width={size} height={size} fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}
