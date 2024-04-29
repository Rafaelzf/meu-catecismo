import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("--twanimate-pulse --twrounded-md --twbg-slate-100 dark:--twbg-slate-800", className)}
      {...props}
    />
  )
}

export { Skeleton }
