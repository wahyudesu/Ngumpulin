import type * as React from "react"
import { cn } from "@/lib/utils"

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> { }

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto", className)} {...props}>
      {children}
    </div>
  )
}

export interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  header: React.ReactNode
  icon?: React.ReactNode
}

export function BentoGridItem({ title, description, header, icon, className, ...props }: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "row-span-1 flex flex-col group/bento rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden dark:border-neutral-800 dark:bg-neutral-950",
        className,
      )}
      {...props}
    >
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-hidden">{header}</div>
        <div className="p-4 flex-shrink-0 transition duration-200 group-hover/bento:translate-x-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-neutral-700 dark:text-neutral-300">{title}</p>
            {icon && <div>{icon}</div>}
          </div>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
