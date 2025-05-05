import { IIconProps } from "@/utils/interfaces";

export function ChevronRightIcon({
    size = 24,
    className,
}: Readonly<IIconProps>) {
    return <span className={className}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="chevron-right-icon">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </span>
}
