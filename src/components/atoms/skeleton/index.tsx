import { SatelliteDish } from "lucide-react";

export interface HeaderTopicsProps {
  size: "sm" | "lg";
}

export default function Skeleton({ size = "sm" }: HeaderTopicsProps) {
  if (size === "sm") {
    return (
      <div className="flex flex-col w-full animate-pulse gap-2">
        <div className="h-3 bg-slate-300 rounded"></div>
        <div className="h-3 bg-slate-300 rounded"></div>
      </div>
    );
  }

  if (size === "lg") {
    return (
      <div className="flex flex-col justify-center w-full animate-pulse gap-4">
        <div className="h-6 bg-slate-300 rounded"></div>
        <div className="h-6 bg-slate-300 rounded "></div>
        <div className="h-6 flex flex-row justify-center w-full">
          <SatelliteDish className="text-destructive" />
        </div>
        <div className="h-6 bg-slate-300 rounded"></div>
        <div className="h-6 bg-slate-300 rounded"></div>
      </div>
    );
  }
}
