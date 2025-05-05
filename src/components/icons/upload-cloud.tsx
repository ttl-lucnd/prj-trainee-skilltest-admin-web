import { IIconProps } from '@/utils/interfaces';

export function UploadCloudIcon({ size = 24, className }: Readonly<IIconProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_11541_8294)">
        <path
          d="M16.5 16L12.5 12L8.5 16"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 12V21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.8895 18.3914C21.8648 17.8597 22.6353 17.0183 23.0793 16.0001C23.5234 14.9818 23.6157 13.8447 23.3417 12.7681C23.0677 11.6916 22.443 10.737 21.5661 10.0549C20.6893 9.37283 19.6103 9.00218 18.4995 9.00145H17.2395C16.9368 7.83069 16.3726 6.74378 15.5894 5.82244C14.8062 4.9011 13.8243 4.1693 12.7176 3.68206C11.6108 3.19481 10.408 2.96481 9.19959 3.00933C7.99116 3.05385 6.80854 3.37175 5.74065 3.93911C4.67276 4.50648 3.74738 5.30855 3.03409 6.28503C2.3208 7.26151 1.83816 8.38699 1.62245 9.57684C1.40674 10.7667 1.46358 11.99 1.78869 13.1547C2.11379 14.3194 2.69871 15.3953 3.49947 16.3014"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 16L12.5 12L8.5 16"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_11541_8294">
          <rect width="24" height="24" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
