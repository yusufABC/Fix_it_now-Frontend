// =========================================================================
// 1. PUBLIC & SERVICE TYPES
// =========================================================================

export interface ICategory {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

export interface ITechnicianUser {
  id: string;
  name: string;
  email: string;
}

export interface ITechnician {
  id: string;
  userId: string;
  skills: string[];
  yearOfExperience: number;
  location: string;
  averageRating: number;
  totalReviews: number;
  user: ITechnicianUser;
}

export interface IService {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  technician: ITechnician;
}

// =========================================================================
// 2. BOOKING STATUS & CUSTOMER BOOKINGS
// =========================================================================

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface IBooking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  address: string;
  notes: string | null;
  scheduledAt: string;
  status: BookingStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  service: {
    id: string;
    technicianId: string;
    categoryId: string;
    title: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
  };
  technician: {
    id: string;
    userId: string;
    skills: string[];
    yearOfExperience: number;
    location: string;
    averageRating: number;
    totalReviews: number;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  // ✅ Merged cleanly here (no duplicate interface!):
  review?: {
    id: string;
    rating: number;
    comment: string | null;
  } | null;
}

// =========================================================================
// 3. TECHNICIAN DASHBOARD TYPES
// =========================================================================

export interface ITechBookingItem {
  id: string;
  scheduledAt: string;
  address: string;
  notes: string | null;
  status: BookingStatus;
  totalAmount: number;
  service: {
    title: string;
    price: number;
  };
  customer: {
    name: string;
    email: string;
  };
}

export interface ICategoryForTechnicianServiceCreate {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export type CreateServiceState = {
  success: boolean;
  message?: string;
  data?: unknown;
} | null;

export type BookingStatusState = {
  success: boolean;
  message?: string;
  data?: unknown;
} | null;

// =========================================================================
// 4. ADMIN DASHBOARD TYPES (For Stats, Categories, Users & Global Bookings)
// =========================================================================

export interface IAdminStats {
  totalUsers?: number;
  totalCustomers: number;
  totalTechnicians: number;
  totalBookings: number;
  totalRevenue: number;
}

export interface IAdminCategory {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    services: number;
  };
}

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED";

export interface ITechnicianProfileSummary {
  id: string;
  location: string;
  averageRating: number;
  totalReviews: number;
  yearOfExperience: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  technicianProfile: ITechnicianProfileSummary | null;
}

export interface IAdminSubscription {
  id: string;
  userId: string;
  bookingId: string;
  transactionId: string;
  amount: number;
  subscriptionStatus: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  currentPeriodEnd: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminBooking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  address: string;
  notes: string | null;
  scheduledAt: string;
  status: BookingStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  technician: {
    id: string;
    userId: string;
    skills: string[];
    yearOfExperience: number;
    location: string;
    averageRating: number;
    totalReviews: number;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  service: {
    id: string;
    title: string;
    price: number;
  };
  subscription: IAdminSubscription | null;
  review: {
    id?: string;
    rating?: number;
    comment?: string | null;
  } | null;
}