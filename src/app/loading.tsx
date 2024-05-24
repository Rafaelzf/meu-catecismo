"use client";

import { Skeleton } from "@/components/atoms";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <Card>
      <CardContent className="flex justify-center items-center py-10">
        <Skeleton size="lg" />
      </CardContent>
    </Card>
  );
}
