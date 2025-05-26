import { IIconProps } from "@/utils/interfaces";

export function SubjectListIcon({
    size = 24,
    className,
}: Readonly<IIconProps>) {
    return <span className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#clip0_1200_13921)">
        <path d="M5 18.3337V3.33366C5 2.89163 5.17559 2.46771 5.48816 2.15515C5.80072 1.84259 6.22464 1.66699 6.66667 1.66699H13.3333C13.7754 1.66699 14.1993 1.84259 14.5118 2.15515C14.8244 2.46771 15 2.89163 15 3.33366V18.3337H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.00008 10H3.33341C2.89139 10 2.46746 10.1756 2.1549 10.4882C1.84234 10.8007 1.66675 11.2246 1.66675 11.6667V16.6667C1.66675 17.1087 1.84234 17.5326 2.1549 17.8452C2.46746 18.1577 2.89139 18.3333 3.33341 18.3333H5.00008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 7.5H16.6667C17.1087 7.5 17.5326 7.6756 17.8452 7.98816C18.1577 8.30072 18.3333 8.72464 18.3333 9.16667V16.6667C18.3333 17.1087 18.1577 17.5326 17.8452 17.8452C17.5326 18.1577 17.1087 18.3333 16.6667 18.3333H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.33325 5H11.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.33325 8.33301H11.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.33325 11.667H11.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.33325 15H11.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_1200_13921">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    </span>
}