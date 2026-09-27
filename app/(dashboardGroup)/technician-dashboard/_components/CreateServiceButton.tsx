"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateServiceModal from "./CreateServiceModal";
import { ICategoryForTechnicianServiceCreate } from "@/lib/types";

export default function CreateServiceButton({categories}:{
  categories: ICategoryForTechnicianServiceCreate[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm"
      >
        + Add New Service
      </Button>
       {isOpen && (
        <CreateServiceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          categories={categories}
        />
      )}

      <CreateServiceModal isOpen={isOpen} onClose={() => setIsOpen(false)} categories={categories}/>
    </>
  );
}