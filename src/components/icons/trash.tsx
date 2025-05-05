import { IIconProps } from '@/utils/interfaces';

export function TrashIcon({ size = 24, className }: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="trash-icon"
      >
        <path
          d="M15.418 5.41667L14.6229 16.5473C14.5544 17.5067 13.7561 18.25 12.7943 18.25H5.20835C4.24652 18.25 3.44821 17.5067 3.37968 16.5473L2.58464 5.41667M7.16797 9.08333V14.5833M10.8346 9.08333V14.5833M11.7513 5.41667V2.66667C11.7513 2.16041 11.3409 1.75 10.8346 1.75H7.16797C6.66171 1.75 6.2513 2.16041 6.2513 2.66667V5.41667M1.66797 5.41667H16.3346"
          stroke="currentColor"
          strokeWidth="1.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
