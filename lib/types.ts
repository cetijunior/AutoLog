export type UserRole = "owner" | "garage";

export type ServiceStatus = "user_logged" | "garage_verified";

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface Vehicle {
  id: string;
  owner_id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  mileage: number;
}

export interface Garage {
  id: string;
  claimed_by?: string;
  name: string;
  address: string;
  google_place_id: string;
  phone: string;
}

export interface ServiceRecord {
  id: string;
  vehicle_id: string;
  garage_id?: string;
  date: string;
  mileage_at_service: number;
  service_type: string;
  description: string;
  cost: number;
  receipt_image_url: string;
  status: ServiceStatus;
}
