export function Cube24Icon({
  size = 16,
  className,
}: Readonly<{
  size?: number;
  className?: string;
}>) {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M9.33317 6.66667L7.99984 7.33333M7.99984 7.33333L6.6665 6.66667M7.99984 7.33333V9M13.3332 4.66667L11.9998 5.33333M13.3332 4.66667L11.9998 4M13.3332 4.66667V6.33333M9.33317 2.66667L7.99984 2L6.6665 2.66667M2.6665 4.66667L3.99984 4M2.6665 4.66667L3.99984 5.33333M2.6665 4.66667V6.33333M7.99984 14L6.6665 13.3333M7.99984 14L9.33317 13.3333M7.99984 14V12.3333M3.99984 12L2.6665 11.3333V9.66667M11.9998 12L13.3332 11.3333V9.66667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
