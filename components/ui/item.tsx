import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a&]:hover:bg-accent/50 [a&]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[3px]",
  {
    variants: {
      size: {
        default: "gap-2 px-3 py-2",
        sm: "gap-1.5 px-2 py-1.5",
        lg: "gap-3 px-4 py-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

function Item({
  className,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return <Comp data-slot="item" className={cn(itemVariants({ size }), className)} {...props} />
}

function ItemIcon({ className, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
  return (
    <div
      data-slot="item-icon"
      className={cn(
        "text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function ItemLabel({ className, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
  return <div data-slot="item-label" className={cn("flex-1 truncate font-medium", className)} {...props} />
}

function ItemDescription({ className, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
  return (
    <div
      data-slot="item-description"
      className={cn("text-muted-foreground w-full truncate text-xs font-normal", className)}
      {...props}
    />
  )
}

function ItemIndicator({ className, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
  return (
    <div
      data-slot="item-indicator"
      className={cn(
        "text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

export { Item, ItemIcon, ItemLabel, ItemDescription, ItemIndicator }
