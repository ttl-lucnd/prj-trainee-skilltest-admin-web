"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"

export interface CheckboxGroupProps {
    className?: string
    items: {
        value: string
        label: string
    }[]
    value?: string[]
    onValueChange?: (value: string[]) => void
    disabled?: boolean
    columns?: 1 | 2 | 3 | 4 | 6
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
    ({ className, items, value = [], onValueChange, disabled, columns, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'w-full',
                    columns
                        ? "grid gap-4"
                        : "flex flex-row flex-wrap gap-4",
                    {
                        'grid-cols-1': columns === 1,
                        'grid-cols-2': columns === 2,
                        'grid-cols-3': columns === 3,
                        'grid-cols-4': columns === 4,
                        'grid-cols-6': columns === 6,
                    },
                    className
                )}
                ref={ref}
            >
                {items?.map((item) => (
                    <div key={item.value} className="flex items-center space-x-1">
                        <Checkbox
                            id={item.value}
                            checked={value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                                const newValue = checked
                                    ? [...(value || []), item.value]
                                    : (value || []).filter((v) => v !== item.value)
                                onValueChange?.(newValue)
                            }}
                            disabled={disabled}
                            {...props}
                        />
                        <label
                            htmlFor={item.value}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 min-w-[70px] whitespace-nowrap"
                        >
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
        )
    }
)
CheckboxGroup.displayName = "CheckboxGroup"

export { CheckboxGroup } 