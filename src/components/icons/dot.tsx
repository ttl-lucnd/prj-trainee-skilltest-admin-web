export function DotIcon({
  size = 8,
  className,
}: Readonly<{ size?: number; className?: string }>) {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={(size / 8) * 9}
        viewBox="0 0 8 9"
        fill="none"
      >
        <circle cx="4" cy="4.5" r="4" fill="currentColor" />
      </svg>
    </span>
  );
}
