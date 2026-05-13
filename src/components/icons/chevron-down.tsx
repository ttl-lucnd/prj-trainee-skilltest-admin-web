export function ChevronDownIcon({
  size = 12,
  className,
}: Readonly<{
  size?: number;
  className?: string;
}>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      data-testid="chevron-down-icon"
      className={className}
    >
      <path
        d="M19 9L12 16L5 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
