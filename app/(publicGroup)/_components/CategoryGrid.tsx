import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export interface ICategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  serviceCount: number;
}

// Static mock categories (Replace with dynamic getCategoriesAction())
export const STATIC_CATEGORIES: ICategoryItem[] = [
  {
    id: "cat-plumbing",
    name: "Plumbing",
    description: "Leak fix, tap installation, drain unblocking",
    icon: "🚰",
    serviceCount: 14,
  },
  {
    id: "cat-electrical",
    name: "Electrical",
    description: "Circuit breaker, fan wiring, switches & sockets",
    icon: "⚡",
    serviceCount: 22,
  },
  {
    id: "cat-cleaning",
    name: "Cleaning",
    description: "Deep house cleaning, sofa & kitchen sanitizing",
    icon: "🧹",
    serviceCount: 9,
  },
  {
    id: "cat-painting",
    name: "Painting",
    description: "Interior wall coating, damp repair & wall decor",
    icon: "🎨",
    serviceCount: 6,
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900">Explore Service Categories</h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Choose a specialty department to browse qualified technicians and transparent service packages.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATIC_CATEGORIES.map((cat) => (
          <Link key={cat.id} href={`/services?categoryId=${cat.id}`} className="group">
            <Card className="p-6 h-full border border-gray-200 bg-white rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{cat.description}</p>
              <span className="inline-block mt-4 text-xs font-semibold text-blue-600">
                {cat.serviceCount} services available →
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}