"use client"

import { Control } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CheckboxGroup as BaseCheckboxGroup } from "@/components/ui/checkbox-group"
import { cn } from "@/lib/utils"

interface CheckboxGroupFieldProps {
    readonly name: string
    readonly label?: string
    readonly control: Control<any>
    readonly isHorizontal?: boolean
    readonly items: ReadonlyArray<{
        readonly value: string
        readonly label: string
    }>
    readonly columns?: 1 | 2 | 3 | 4 | 6
    readonly className?: string
}

export function CheckboxGroup({
    name,
    label,
    control,
    items,
    isHorizontal = false,
    className,
    ...props
}: CheckboxGroupFieldProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("items-center gap-2", isHorizontal && "flex flex-row", className)}>
                    {label && <FormLabel className="min-w-[140px] text-left w-1/4 mt-2 self-start">{label}</FormLabel>}
                    <FormControl>
                        <BaseCheckboxGroup
                            items={[...items]}
                            value={field.value}
                            onValueChange={field.onChange}
                            {...props}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
