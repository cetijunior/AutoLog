import { Garage, ServiceRecord, User, Vehicle } from "@/lib/types";

export const currentUser: User = {
  id: "user-1",
  role: "owner",
  name: "Chris Jordan",
  email: "chris@example.com",
  phone: "(555) 123-1000",
  created_at: "2026-01-08",
};

export const garages: Garage[] = [
  {
    id: "garage-1",
    name: "Summit Auto Care",
    address: "1422 Industrial Ave, Austin, TX",
    google_place_id: "ChIJplaceholder1",
    phone: "(512) 555-0101",
    claimed_by: "garage-user-1",
  },
  {
    id: "garage-2",
    name: "QuickLane Tires & Brakes",
    address: "89 East Loop, Austin, TX",
    google_place_id: "ChIJplaceholder2",
    phone: "(512) 555-0102",
  },
];

export const vehicles: Vehicle[] = [
  {
    id: "veh-1",
    owner_id: currentUser.id,
    vin: "1HGCM82633A112345",
    make: "Honda",
    model: "Accord",
    year: 2019,
    license_plate: "TX-AUTO19",
    mileage: 64200,
  },
  {
    id: "veh-2",
    owner_id: currentUser.id,
    vin: "WBA8E9G54HNU29381",
    make: "BMW",
    model: "330i",
    year: 2018,
    license_plate: "TX-MOTR18",
    mileage: 78120,
  },
];

export const serviceRecords: ServiceRecord[] = [
  {
    id: "rec-1",
    vehicle_id: "veh-1",
    garage_id: "garage-1",
    date: "2026-03-01",
    mileage_at_service: 64010,
    service_type: "Oil Change",
    description: "Full synthetic oil and OEM filter replacement.",
    cost: 89.99,
    receipt_image_url: "/receipts/receipt-placeholder.png",
    status: "garage_verified",
  },
  {
    id: "rec-2",
    vehicle_id: "veh-1",
    garage_id: "garage-2",
    date: "2025-11-20",
    mileage_at_service: 60200,
    service_type: "Brake Service",
    description: "Front pads replaced and rotor resurfacing.",
    cost: 340,
    receipt_image_url: "/receipts/receipt-placeholder.png",
    status: "user_logged",
  },
  {
    id: "rec-3",
    vehicle_id: "veh-2",
    garage_id: "garage-1",
    date: "2026-02-04",
    mileage_at_service: 77580,
    service_type: "Tire Rotation",
    description: "Rotation plus tire pressure sensor reset.",
    cost: 65,
    receipt_image_url: "/receipts/receipt-placeholder.png",
    status: "garage_verified",
  },
];

export const getGarageById = (garageId?: string) =>
  garages.find((garage) => garage.id === garageId);

export const getVehicleById = (vehicleId: string) =>
  vehicles.find((vehicle) => vehicle.id === vehicleId);

export const getRecordsForVehicle = (vehicleId: string) =>
  serviceRecords
    .filter((record) => record.vehicle_id === vehicleId)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
