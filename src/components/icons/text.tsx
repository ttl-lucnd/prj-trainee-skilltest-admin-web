import { IIconProps } from '@/utils/interfaces';

export function TextIcon({ size = 24, className }: Readonly<IIconProps>) {
  return (
    <span className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.59961 0.366C10.0856 0.366 12.9136 3.194 12.9136 6.68C12.9136 10.18 10.0856 13.008 6.59961 13.008C3.09961 13.008 0.271609 10.18 0.271609 6.68C0.271609 3.194 3.09961 0.366 6.59961 0.366ZM6.59961 1.444C3.70161 1.444 1.34961 3.796 1.34961 6.68C1.34961 9.578 3.70161 11.93 6.59961 11.93C9.48361 11.93 11.8356 9.578 11.8356 6.68C11.8356 3.796 9.48361 1.444 6.59961 1.444Z"
          fill="#545F71"
        />
      </svg>
    </span>
  );
}
