import { IIconProps } from "@/utils/interfaces";

export function LoadingCircleIcon({
  className,
  size = 20,
}: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        data-testid="loading-circle-icon"
      >
        <path
          opacity="0.15"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99984 16.6666C13.6817 16.6666 16.6665 13.6819 16.6665 9.99996C16.6665 6.31806 13.6817 3.33329 9.99984 3.33329C6.31794 3.33329 3.33317 6.31806 3.33317 9.99996C3.33317 13.6819 6.31794 16.6666 9.99984 16.6666ZM9.99984 18.3333C14.6022 18.3333 18.3332 14.6023 18.3332 9.99996C18.3332 5.39759 14.6022 1.66663 9.99984 1.66663C5.39746 1.66663 1.6665 5.39759 1.6665 9.99996C1.6665 14.6023 5.39746 18.3333 9.99984 18.3333Z"
          fill="#81849C"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99984 3.33329C6.31794 3.33329 3.33317 6.31806 3.33317 9.99996C3.33317 13.6819 6.31794 16.6666 9.99984 16.6666C10.4601 16.6666 10.8332 17.0397 10.8332 17.5C10.8332 17.9602 10.4601 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996C18.3332 10.4602 17.9601 10.8333 17.4998 10.8333C17.0396 10.8333 16.6665 10.4602 16.6665 9.99996C16.6665 6.31806 13.6817 3.33329 9.99984 3.33329Z"
          fill="url(#paint0_linear_37_8345)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_37_8345"
            x1="9.99984"
            y1="9.99996"
            x2="9.99984"
            y2="16.6666"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
