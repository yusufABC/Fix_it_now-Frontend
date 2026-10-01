"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal({ isOpen, onClose }: CreateCategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl relative space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Create New Service Category</h2>
          <p className="text-xs text-gray-500 mt-1">
            Categories group technician offerings (e.g. Plumbing, Electrical, Cleaning).
          </p>
        </div>

        {/* Plug your server action into action="" */}
        <form action="" className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Category Name
            </label>
            <Input
              type="text"
              name="name"
              required
              placeholder="e.g. Appliance Repair"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Banner / Icon Image URL
            </label>
            <Input
              type="url"
              name="imageUrl"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Category Description
            </label>
            <textarea
              name="description"
              rows={3}
              required
              placeholder="Brief description of the services included under this category..."
              className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Create Category
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}