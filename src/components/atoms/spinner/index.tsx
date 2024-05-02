"use client";
import useSWRMutation from "swr/mutation";
import { getSections } from "@/app/actions";
import { Loader2 } from "lucide-react";
export function Spinner() {
  const { isMutating } = useSWRMutation("sections", getSections);
  console.log({ isMutating });
  return (
    <div>
      {isMutating && (
        <Loader2 className="animate-spin size-[40px] text-emerald-500 " />
      )}
    </div>
  );
}

export default Spinner;
