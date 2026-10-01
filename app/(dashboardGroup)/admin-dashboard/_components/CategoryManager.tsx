"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CreateCategoryModal from "./CreateCategoryModal";

export interface IAdminCategoryItem {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  _count?: { services: number };
}

export default function CategoryManager({ categories }: { categories: IAdminCategoryItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Service Categories</h2>
          <p className="text-xs text-gray-500">
            Manage public platform categories and technician departments.
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
        >
          + Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Card key={cat.id} className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base">{cat.name}</h3>
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-semibold">
                {cat._count?.services ?? 0} Services
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">{cat.description || "No description provided."}</p>
          </Card>
        ))}
      </div>

      {isOpen && <CreateCategoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
}