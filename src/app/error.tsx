"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Bug, TriangleAlert } from "lucide-react";

export default function Error() {
  return (
    <>
      <Card>
        <CardContent className="flex justify-center items-center py-10">
          <Alert variant="destructive">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Ocorreu algum erro volte mais tarde. <Bug />
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </>
  );
}
