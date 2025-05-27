import { IIconProps } from "@/utils/interfaces";

export function QuestionListIcon({
    size = 24,
    className,
}: Readonly<IIconProps>) {
    return <span className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path d="M12.5001 1.66699H7.50008C7.03984 1.66699 6.66675 2.04009 6.66675 2.50033V4.16699C6.66675 4.62723 7.03984 5.00033 7.50008 5.00033H12.5001C12.9603 5.00033 13.3334 4.62723 13.3334 4.16699V2.50033C13.3334 2.04009 12.9603 1.66699 12.5001 1.66699Z" stroke="currentColor" strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3333 3.33301H14.9999C15.4419 3.33301 15.8659 3.5086 16.1784 3.82116C16.491 4.13372 16.6666 4.55765 16.6666 4.99967V16.6663C16.6666 17.1084 16.491 17.5323 16.1784 17.8449C15.8659 18.1574 15.4419 18.333 14.9999 18.333H4.99992C4.55789 18.333 4.13397 18.1574 3.82141 17.8449C3.50885 17.5323 3.33325 17.1084 3.33325 16.6663V4.99967C3.33325 4.55765 3.50885 4.13372 3.82141 3.82116C4.13397 3.5086 4.55789 3.33301 4.99992 3.33301H6.66659" stroke="currentColor" strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9.16699H13.3333" stroke="currentColor" strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 13.333H13.3333" stroke="currentColor" strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.66675 9.16699H6.67508" stroke="currentColor" strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.66675 13.333H6.67508" stroke="currentColor" strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
}