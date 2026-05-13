import { IIconProps } from "@/utils/interfaces";

export function XCrossIcon({
    size = 24,
    className,
}: Readonly<IIconProps>) {
    return <span className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 11 11" fill="none" >
            <path d="M1.47 11.564L0.714 10.808L5.306 6.188L0.714 1.568L1.47 0.812L6.062 5.432L10.626 0.812L11.382 1.568L6.79 6.188L11.382 10.808L10.626 11.564L6.062 6.972L1.47 11.564Z" fill="currentColor"/>
        </svg>
    </span>
}