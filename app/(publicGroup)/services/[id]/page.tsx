
import { IService } from "@/lib/types";
import { getIndividualServicesAction } from "../../_actions/publicActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GetIndividualService from "../../_components/IndividualService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailsPage({ params }: PageProps) {
  // In Next.js 15+, params is a Promise
  const { id } = await params;

  // Direct server-side fetch — NO useEffect needed!
  const result = await getIndividualServicesAction(id);

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Service Not Found</h2>
        <p className="text-sm text-gray-500">This service does not exist or has been removed.</p>
        <Link href="/services">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Back to Services</Button>
        </Link>
      </div>
    );
  }

  const service: IService = result.data;

  return <GetIndividualService service={service} />;
}