# Project Blueprint: "AutoLog" - The Digital Vehicle Logbook

## 1. Project Overview

**Concept:** A two-sided platform acting as a "LinkedIn meets CarFax" for vehicle maintenance.
**Users:** 1. Car Owners (Clients): Log services, upload receipts, track maintenance history, and generate shareable vehicle "resumes" for resale. 2. Garages (Businesses): Verify tagged services to build a public portfolio, increase trust, and generate leads.
**Format:** Mobile-first Progressive Web App (PWA).

---

## 2. Tech Stack Requirements

- **Framework:** Next.js (App Router) using React.
- **Styling:** Tailwind CSS (for rapid, responsive mobile-first UI).
- **UI Components:** shadcn/ui (for scalable, accessible, and clean pre-built components like buttons, modals, and forms).
- **Backend & Database:** Supabase (PostgreSQL, Authentication, and Storage for receipt photos).
- **Icons:** Lucide React.

---

## 3. Design System & Theming

The design must evoke trust, cleanliness, and modern automotive styling.

- **Color Palette:**
  - **Primary:** Indigo Blue (`bg-indigo-600`) - Represents trust and verification.
  - **Secondary:** Slate/Zinc (`bg-zinc-900` to `bg-zinc-100`) - For a sleek, mechanical, modern look.
  - **Success:** Emerald Green (`bg-emerald-500`) - Used explicitly for the "Verified by Garage" badge.
  - **Accent:** Amber (`bg-amber-500`) - For "Maintenance Due" alerts.
- **Typography:** Inter or Roboto (Clean, highly legible sans-serif on mobile screens).
- **Layout Rules:** \* Mobile-first: All interactive elements (buttons, inputs) must be at least 44px tall for easy tapping.
  - Bottom Navigation bar for logged-in users on mobile devices.

---

## 4. Core Database Schema (Supabase / PostgreSQL)

The AI should use this to structure the database models.

- **Users Table:** `id` (UUID), `role` (owner | garage), `name`, `email`, `phone` (optional), `created_at`.
- **Vehicles Table:** `id` (UUID), `owner_id` (FK -> Users), `vin` (string), `make` (string), `model` (string), `year` (int), `license_plate` (string), `mileage` (int).
- **Garages Table:** `id` (UUID), `claimed_by` (FK -> Users, nullable), `name`, `address`, `google_place_id`, `phone`.
- **Service_Records Table:** `id` (UUID), `vehicle_id` (FK -> Vehicles), `garage_id` (FK -> Garages, nullable), `date` (date), `mileage_at_service` (int), `service_type` (string), `description` (text), `cost` (decimal), `receipt_image_url` (string), `status` (enum: 'user_logged', 'garage_verified').

---

## 5. App Layouts & Route Structure

### A. Public Routes

- `/` (Landing Page): Value prop for both Owners and Garages. "Start logging for free" call-to-action (CTA).
- `/public/[vehicle_id]`: The "Vehicle Resume". A read-only, beautifully formatted timeline of the car's history. Has a toggle to "Hide Costs" for privacy.
- `/garage/[garage_id]`: Public profile for a garage showing verified repairs, address, and rating.

### B. Authenticated Routes (Car Owner)

- `/dashboard`: User's virtual garage. Shows a card for each owned vehicle.
- `/vehicle/[vehicle_id]`: The detailed timeline for a specific car.
- `/add-service`: A wizard-style form optimized for mobile.
  - Step 1: Select Vehicle.
  - Step 2: Enter Mileage & Date.
  - Step 3: What was done? (Oil, Brakes, Tires, Custom).
  - Step 4: Tag Garage (Search input that queries Google Places API / local DB).
  - Step 5: Upload Receipt (Opens phone camera or gallery).
- `/settings`: Profile and notification preferences.

### C. Authenticated Routes (Garage)

- `/pro/dashboard`: Inbox of pending "Tag Requests" from users.
- `/pro/verify/[record_id]`: Screen showing the user's submitted receipt and details. Big green "Verify Service" or red "Reject/Edit" button.

---

## 6. Key Features & Components for AI to Build

1.  **The "Verified Badge":** A reusable UI component that shows a green checkmark with "Verified by [Garage Name]" if `status === 'garage_verified'`.
2.  **Timeline View:** A vertical timeline component for `/vehicle/[id]` showing services chronologically from newest to oldest.
3.  **Frictionless Garage Onboarding:** When a user tags an unclaimed garage, the system creates a placeholder in the `Garages` table and generates a unique magic link.
4.  **Bottom Mobile Navigation:** Sticky bottom bar with: Home (Dashboard), (+) Add Service, Profile.

---

## 7. AI Agent Execution Instructions

- **Phase 1:** Initialize Next.js project with Tailwind and shadcn/ui. Set up route scaffolding.
- **Phase 2:** Build out the static UI components (Dashboard layout, Timeline component, Add Service form) using mock data.
- **Phase 3:** Integrate Supabase. Create tables based on the schema and wire up Google Auth.
- **Phase 4:** Connect UI to database (CRUD operations for Vehicles and Service Records).
