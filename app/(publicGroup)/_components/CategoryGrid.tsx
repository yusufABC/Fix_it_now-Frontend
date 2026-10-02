import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { getCategoryAction } from "@/app/(dashboardGroup)/technician-dashboard/_actions/getCategoryAction";
import { Button } from "@/components/ui/button";

export interface ICategoryItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
}

export default async function CategoryGrid() {
  // 1. Fetch response object from backend
  const res = await getCategoryAction();

  // 2. Safely extract the real array from res.data
  const categories: ICategoryItem[] = res?.success && Array.isArray(res?.data) ? res.data : [];

  if (categories.length === 0) {
    return null; // Don't show section if no categories exist
  }

  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Explore Service Categories
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Choose a specialty department to browse qualified technicians and transparent service packages.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/services?categoryId=${cat.id}`} className="group">
            <Card className="p-6 h-full border border-gray-200 bg-white rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left flex flex-col justify-between">
              <div>
                {/* Image or Icon Fallback */}
                <div className="w-12 h-12 mb-4 rounded-xl overflow-hidden bg-blue-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                  {cat.imageUrl ? (
                    <Image
                      width={48}
                      height={48}
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "🔧"
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description || "Browse verified services in this category."}
                </p>
              </div>

           
            </Card>
              
          </Link>
        ))}
      </div>
      <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2">
        <Link href="/services" className="text-sm font-semibold text-white">
          View All Services
        </Link>
      </Button>
    </section>
  );
}