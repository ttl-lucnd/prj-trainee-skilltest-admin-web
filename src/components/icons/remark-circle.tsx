export function RemarkCircleIcon({
  size = 16,
  color = '#FF7676',
  className,
}: Readonly<{
  size?: number;
  color?: string;
  className?: string;
}>) {
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
        d="M0.5 8C0.5 3.86075 3.86 0.5 8 0.5C12.1475 0.5 15.5 3.86075 15.5 8C15.5 12.1407 12.1475 15.5 8 15.5C3.86 15.5 0.5 12.1407 0.5 8ZM7.34 5.1575C7.34 4.79825 7.64 4.4975 8 4.4975C8.36 4.4975 8.6525 4.79825 8.6525 5.1575V8.4725C8.6525 8.83325 8.36 9.125 8 9.125C7.64 9.125 7.34 8.83325 7.34 8.4725V5.1575ZM8.0075 11.5107C7.64 11.5107 7.3475 11.2107 7.3475 10.8507C7.3475 10.4907 7.64 10.1982 8 10.1982C8.3675 10.1982 8.66 10.4907 8.66 10.8507C8.66 11.2107 8.3675 11.5107 8.0075 11.5107Z"
        fill={color}
      />
    </svg>
  );
}
