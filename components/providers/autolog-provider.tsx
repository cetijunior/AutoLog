"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { garages as seedGarages, serviceRecords as seedRecords, vehicles as seedVehicles } from "@/lib/mock-data";
import { Garage, ServiceRecord, Vehicle } from "@/lib/types";

const STORAGE_KEY = "autolog_state_v1";

interface NotificationSettings {
  maintenanceAlerts: boolean;
  verificationAlerts: boolean;
  weeklySummary: boolean;
}

interface AutoLogState {
  vehicles: Vehicle[];
  garages: Garage[];
  serviceRecords: ServiceRecord[];
  notificationSettings: NotificationSettings;
}

interface AddServiceInput {
  vehicle_id: string;
  mileage_at_service: number;
  date: string;
  service_type: string;
  description: string;
  garage_id?: string;
  cost?: number;
}

interface AutoLogContextValue extends AutoLogState {
  addServiceRecord: (input: AddServiceInput) => string;
  updateRecordStatus: (recordId: string, status: "user_logged" | "garage_verified") => void;
  updateNotificationSettings: (settings: NotificationSettings) => void;
}

const initialState: AutoLogState = {
  vehicles: seedVehicles,
  garages: seedGarages,
  serviceRecords: seedRecords,
  notificationSettings: {
    maintenanceAlerts: true,
    verificationAlerts: true,
    weeklySummary: false,
  },
};

const AutoLogContext = createContext<AutoLogContextValue | undefined>(undefined);

export function AutoLogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AutoLogState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AutoLogState;
        setState(parsed);
      }
    } catch {
      setState(initialState);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const addServiceRecord = useCallback((input: AddServiceInput) => {
    const id = `rec-${Date.now()}`;
    const record: ServiceRecord = {
      id,
      vehicle_id: input.vehicle_id,
      garage_id: input.garage_id,
      date: input.date,
      mileage_at_service: input.mileage_at_service,
      service_type: input.service_type,
      description: input.description,
      cost: input.cost ?? 0,
      receipt_image_url: "",
      status: "user_logged",
    };

    setState((prev) => ({ ...prev, serviceRecords: [record, ...prev.serviceRecords] }));
    return id;
  }, []);

  const updateRecordStatus = useCallback((recordId: string, status: "user_logged" | "garage_verified") => {
    setState((prev) => ({
      ...prev,
      serviceRecords: prev.serviceRecords.map((record) =>
        record.id === recordId ? { ...record, status } : record,
      ),
    }));
  }, []);

  const updateNotificationSettings = useCallback((settings: NotificationSettings) => {
    setState((prev) => ({ ...prev, notificationSettings: settings }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      addServiceRecord,
      updateRecordStatus,
      updateNotificationSettings,
    }),
    [state, addServiceRecord, updateRecordStatus, updateNotificationSettings],
  );

  return <AutoLogContext.Provider value={value}>{children}</AutoLogContext.Provider>;
}

export function useAutoLog() {
  const context = useContext(AutoLogContext);
  if (!context) {
    throw new Error("useAutoLog must be used inside AutoLogProvider");
  }
  return context;
}
