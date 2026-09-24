
import { IService } from "@/lib/types";
import ServiceCard from "../_components/ServiceCard";
import { getServiceAction } from "../_actions/publicActions";


// Static mock services catalogue strictly adhering to IService



export default async function ServicesCatalogPage() {
const result=await getServiceAction()
const services:IService[]=result.success ? result.data:[]
// console.log(services);

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-extrabold text-gray-900">All Home Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse verified services, check prices, and book appointments directly.
          </p>
        </div>

        {/* Total count */}
        <p className="text-xs text-gray-500 font-medium">
          Showing {services.length} available services
        </p>

        {/* Simple Services Grid */}
        {services.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
            <p className="text-lg font-bold text-gray-800">No services found</p>
            <p className="text-sm text-gray-500 mt-1">
              There are no services listed in the database right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
