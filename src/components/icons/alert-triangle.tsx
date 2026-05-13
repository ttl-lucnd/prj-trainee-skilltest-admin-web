import { IIconProps } from "@/utils/interfaces";

export function AlertTriangleIcon({ size = 24, className }: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 97 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"

        data-testid="alert-triangle-icon"
      >
        <path
          d="M41.6591 15.4408L7.77911 72.0008C7.08058 73.2105 6.71097 74.582 6.70706 75.9789C6.70315 77.3758 7.06507 78.7493 7.75681 79.9629C8.44856 81.1765 9.44601 82.1878 10.6499 82.8962C11.8539 83.6046 13.2223 83.9855 14.6191 84.0008H82.3791C83.7759 83.9855 85.1443 83.6046 86.3483 82.8962C87.5522 82.1878 88.5497 81.1765 89.2414 79.9629C89.9331 78.7493 90.2951 77.3758 90.2912 75.9789C90.2872 74.582 89.9176 73.2105 89.2191 72.0008L55.3391 15.4408C54.626 14.2652 53.622 13.2933 52.4239 12.6188C51.2258 11.9442 49.874 11.5898 48.4991 11.5898C47.1242 11.5898 45.7724 11.9442 44.5743 12.6188C43.3762 13.2933 42.3722 14.2652 41.6591 15.4408V15.4408Z"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M48.5 36V52"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M48.5 68H48.54"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
} 