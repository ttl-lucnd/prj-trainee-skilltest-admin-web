import { IIconProps } from '@/utils/interfaces';

export function CollapseIcon({ size = 24, className }: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="collapse-icon"
      >
        <rect x="4" y="6.66663" width="24" height="3" fill="currentColor" />
        <rect x="4" y="23.3333" width="24" height="3" fill="currentColor" />
        <rect x="4" y="15" width="18" height="3" fill="currentColor" />
      </svg>
    </span>
  );
}
