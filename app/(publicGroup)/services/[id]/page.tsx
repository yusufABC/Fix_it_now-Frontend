import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getIndividualServicesAction } from "../../_actions/publicActions";
import GetIndividualService from "../../_components/IndividualService";
import { IService } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Child component that accesses dynamic params
async function ServiceDetailsContent({ params }: PageProps) {
  const { id } = await params;
  const result = await getIndividualServicesAction(id);

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Service Not Found</h2>
        <Link href="/services">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Back to Services</Button>
        </Link>
      </div>
    );
  }

  const service: IService = result.data;
  return <GetIndividualService service={service} />;
}

// 2. Main Page wrapped in Suspense
export default function ServiceDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading service...</div>}>
      <ServiceDetailsContent params={params} />
    </Suspense>
  );
}