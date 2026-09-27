"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ICategoryForTechnicianServiceCreate } from "@/lib/types";
import { createServiceAction } from "../_actions/createServiceAction";

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ICategoryForTechnicianServiceCreate[];
}

export default function CreateServiceModal({
  isOpen,
  onClose,
  categories,
}: CreateServiceModalProps) {
  // 1. Hooking up useActionState
  const [state, action, pending] = useActionState(createServiceAction, null);

  // 2. Reacting to the action result with Sonner toast
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Service created successfully!");
      onClose(); // Automatically close the modal on success
    } else {
      toast.error(state.message || "Failed to create service");
    }
  }, [state, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl relative space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Add New Service Offering</h2>
          <p className="text-xs text-gray-500 mt-1">
            Enlist a service with custom pricing so customers can book you directly.
          </p>
        </div>

        {/* 3. Form action hooked to useActionState */}
        <form action={action} className="space-y-4">
          {/* Service Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Service Title
            </label>
            <Input
              type="text"
              name="title"
              required
              placeholder="e.g. Master Bathroom Leak Detection & Pipe Fix"
            />
          </div>

          {/* Category Dropdown (Populated by real categories from DB) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Service Category
            </label>
            <select
              name="categoryId"
              required
              className="w-full text-sm rounded-md border border-gray-300 p-2.5 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Price ($ USD)
            </label>
            <Input
              type="number"
              name="price"
              step="0.01"
              required
              placeholder="e.g. 75.00"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Service Description
            </label>
            <textarea
              name="description"
              rows={3}
              required
              placeholder="Describe what is included, tools used, and service terms..."
              className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {pending ? "Creating..." : "Create Service"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}