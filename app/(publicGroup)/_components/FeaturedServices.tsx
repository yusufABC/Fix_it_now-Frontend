import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";
import { IService } from "@/lib/types";
import { getServiceAction } from "../_actions/publicActions";

// Static mock services for homepage strictly adhering to IService type
export const STATIC_FEATURED_SERVICES: IService[] = [
  {
    id: "srv-1",
    technicianId: "tech-1",
    categoryId: "cat-plumbing",
    title: "Emergency Pipe Leak Repair",
    description: "Fast fix for bursting pipes, bathroom fixtures, and kitchen sink leaks within an hour.",
    price: 80,
    createdAt: "2026-08-20T10:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
    category: {
      id: "cat-plumbing",
      name: "Plumbing",
      description: "Leak fix, tap installation, drain unblocking",
      imageUrl: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189",
    },
    technician: {
      id: "tech-1",
      userId: "user-1",
      skills: ["Pipe Repair", "Leak Detection", "Bathroom Plumbing"],
      yearOfExperience: 5,
      location: "Gulshan 2, Dhaka",
      averageRating: 4.9,
      totalReviews: 25,
      user: {
        id: "user-1",
        name: "Alex Smith",
        email: "alex.smith@example.com",
      },
    },
  },
  {
    id: "srv-2",
    technicianId: "tech-2",
    categoryId: "cat-electrical",
    title: "Ceiling Fan Installation & Wiring",
    description: "Complete mounting, electrical regulator setup, and power line safety verification.",
    price: 45,
    createdAt: "2026-08-21T11:30:00.000Z",
    updatedAt: "2026-08-21T11:30:00.000Z",
    category: {
      id: "cat-electrical",
      name: "Electrical",
      description: "Wiring, circuit breakers, light fixtures, switchboards",
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
    },
    technician: {
      id: "tech-2",
      userId: "user-2",
      skills: ["Wiring", "Circuit Breakers", "Switchboard Setup"],
      yearOfExperience: 6,
      location: "Dhanmondi, Dhaka",
      averageRating: 4.8,
      totalReviews: 18,
      user: {
        id: "user-2",
        name: "Karim Electrical",
        email: "karim.tech@example.com",
      },
    },
  },
  {
    id: "srv-3",
    technicianId: "tech-3",
    categoryId: "cat-cleaning",
    title: "Kitchen Deep Degreasing & Sanitization",
    description: "Heavy stove cleaning, tile scrubbing, exhaust fan degreasing, and counter disinfection.",
    price: 65,
    createdAt: "2026-08-22T09:15:00.000Z",
    updatedAt: "2026-08-22T09:15:00.000Z",
    category: {
      id: "cat-cleaning",
      name: "Cleaning",
      description: "Deep house cleaning, sofa sanitizing, kitchen degreasing",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    },
    technician: {
      id: "tech-3",
      userId: "user-3",
      skills: ["Kitchen Cleaning", "Deep Sanitization", "Floor Scrubbing"],
      yearOfExperience: 4,
      location: "Banani, Dhaka",
      averageRating: 4.9,
      totalReviews: 31,
      user: {
        id: "user-3",
        name: "CleanPro Services",
        email: "cleanpro@example.com",
      },
    },
  },
];




export default async function FeaturedServices() {
 const result=await getServiceAction();
 console.log(result);
 if(!result.success || !result.data.length){
return(<p>No featured services available.</p>)
 }


  return (
    <section className="py-16 bg-gray-50/70 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Top Rated
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              Featured Services
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Book our most popular services trusted by hundreds of homeowners.
            </p>
          </div>
          <Link href="/services">
            <Button
              variant="outline"
              className="border-gray-300 font-semibold rounded-xl"
            >
              Browse All Services →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {result?.data.map((service:IService) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}