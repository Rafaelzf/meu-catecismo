import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SectionsListAdmin } from "@/components/molecules";
import ButtonCreate from "@/components/atoms/buttonCreate";

export default function Admin() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between content-center">
          <div>
            <CardTitle className="text-orange-800 mb-3">Seções</CardTitle>
            <CardDescription>
              Crie, edite ou delete suas seções.
            </CardDescription>
          </div>
          <ButtonCreate />
        </div>
      </CardHeader>
      <CardContent>
        <SectionsListAdmin />
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
