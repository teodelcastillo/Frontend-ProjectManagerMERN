// ./src/hooks/useGetAppointmentById.ts
// ./src/hooks/useUpdateAppointmentById.ts
// ./src/hooks/useDeleteAppointmentById.ts

import { useCallback } from "react";
import {
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
} from "../../services/appointmentsService";

export const useGetAppointmentById = () => {
  const fetchAppointmentById = useCallback(
    async (appointmentId: string) => {
      try {
        const appointment = await getAppointmentById(appointmentId);
        return appointment;
      } catch (error) {
        console.error("Error fetching appointment by ID:", error);
        return null;
      }
    },
    []
  );

  return { fetchAppointmentById };
};

export const useUpdateAppointmentById = () => {
  const updateAppointment = useCallback(
    async (appointmentId: string) => {
      try {
        const updatedAppointment = await updateAppointmentById(appointmentId);
        return updatedAppointment;
      } catch (error) {
        console.error("Error updating appointment by ID:", error);
        return null;
      }
    },
    []
  );

  return { updateAppointment };
};

export const useDeleteAppointmentById = () => {
  const deleteAppointment = useCallback(
    async (appointmentId: string) => {
      try {
        const success = await deleteAppointmentById(appointmentId);
        return success;
      } catch (error) {
        console.error("Error deleting appointment by ID:", error);
        return false;
      }
    },
    []
  );

  return { deleteAppointment };
};
