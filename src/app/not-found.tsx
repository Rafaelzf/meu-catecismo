import { Card, CardContent } from "@/components/ui/card";
import { Squirrel } from "lucide-react";

export default function NotFound() {
  return (
    <Card>
      <CardContent className="flex justify-center items-center py-10 flex-col">
        <Squirrel className="h-12 w-12 text-destructive" />
        <h1 className="text-2xl text-destructive">Not found</h1>
      </CardContent>
    </Card>
  );
}
