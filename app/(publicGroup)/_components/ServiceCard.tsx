import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IService } from "@/lib/types";

export default function ServiceCard({ service }: { service: IService }) {
  // Safely extract properties with fallbacks so it never crashes
  const rating = service.technician?.averageRating ?? 5.0;
  const reviewsCount = service.technician?.totalReviews ?? 0;
  const technicianName = service.technician?.user?.name ?? "Qualified Technician";
  const location = service.technician?.location ?? "Dhaka";
  const categoryName = service.category?.name ?? "General";
// console.log(service);
  return (
    <Card className="flex flex-col justify-between overflow-hidden border border-gray-200 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div>
        {/* Category Tag & Rating */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {categoryName}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
            <span className="text-yellow-400 text-sm">★</span>
            <span>{Number(rating).toFixed(1)}</span>
            <span className="text-gray-400 font-normal">({reviewsCount})</span>
          </div>
        </div>

        {/* Title & Description */}
    {/* Title links to details */}
<Link href={`/services/${service.id}`}>
  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
    {service.title}
  </h3>
</Link>

...

{/* Button links to details */}

        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Technician info */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium text-gray-700">By {technicianName}</span>
          <span>📍 {location}</span>
        </div>
      </div>

      {/* Price & Action */}
      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Starting at</span>
          <span className="text-2xl font-black text-gray-900">${service.price}</span>
        </div>

    <Link href={`/services/${service.id}`}>
  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl">
    View Details
  </Button>
</Link>
      </div>
    </Card>
  );
}