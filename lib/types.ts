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