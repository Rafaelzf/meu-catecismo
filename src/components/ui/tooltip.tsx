"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "--twz-50 --twoverflow-hidden --twrounded-md --twborder --twborder-slate-200 --twbg-white --twpx-3 --twpy-1.5 --twtext-sm --twtext-slate-950 --twshadow-md --twanimate-in --twfade-in-0 --twzoom-in-95 data-[state=closed]:--twanimate-out data-[state=closed]:--twfade-out-0 data-[state=closed]:--twzoom-out-95 data-[side=bottom]:--twslide-in-from-top-2 data-[side=left]:--twslide-in-from-right-2 data-[side=right]:--twslide-in-from-left-2 data-[side=top]:--twslide-in-from-bottom-2 dark:--twborder-slate-800 dark:--twbg-slate-950 dark:--twtext-slate-50",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
