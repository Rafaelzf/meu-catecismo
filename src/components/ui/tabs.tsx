"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "--twinline-flex --twh-10 --twitems-center --twjustify-center --twrounded-md --twbg-slate-100 --twp-1 --twtext-slate-500 dark:--twbg-slate-800 dark:--twtext-slate-400",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "--twinline-flex --twitems-center --twjustify-center --twwhitespace-nowrap --twrounded-sm --twpx-3 --twpy-1.5 --twtext-sm --twfont-medium --twring-offset-white --twtransition-all focus-visible:--twoutline-none focus-visible:--twring-2 focus-visible:--twring-slate-950 focus-visible:--twring-offset-2 disabled:--twpointer-events-none disabled:--twopacity-50 data-[state=active]:--twbg-white data-[state=active]:--twtext-slate-950 data-[state=active]:--twshadow-sm dark:--twring-offset-slate-950 dark:focus-visible:--twring-slate-300 dark:data-[state=active]:--twbg-slate-950 dark:data-[state=active]:--twtext-slate-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "--twmt-2 --twring-offset-white focus-visible:--twoutline-none focus-visible:--twring-2 focus-visible:--twring-slate-950 focus-visible:--twring-offset-2 dark:--twring-offset-slate-950 dark:focus-visible:--twring-slate-300",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
