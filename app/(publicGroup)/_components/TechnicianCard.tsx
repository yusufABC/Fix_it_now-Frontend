// app/(publicGroup)/_components/TechnicianCard.tsx
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TechnicianCardProps {
  technician?: {
    name?: string;
    category?: string;
    hourlyRate?: number;
    id?: string;
    _id?: string;
  };
}

export default function TechnicianCard({ technician }: TechnicianCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        {/* TODO: Image / Avatar, Name, Category */}
        <h3 className="font-semibold text-lg">{technician?.name || "Technician Name"}</h3>
        <p className="text-sm text-muted-foreground">{technician?.category || "Category"}</p>
      </CardHeader>

      <CardContent>
        {/* TODO: Rating, Hourly rate, Location, Skills */}
        <p className="text-sm font-medium">Rate: ${technician?.hourlyRate || 0}/hr</p>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          {/* Link to detail profile page */}
          <Link href={`/technicians/${technician?.id || technician?._id}`}>
            View Profile & Book
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}