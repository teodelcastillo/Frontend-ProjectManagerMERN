// ./src/hooks/useCreateAppointment.ts
import { useCallback } from "react";
import { createAppointment, AppointmentResponse } from "../../services/appointmentsService";

export const useCreateAppointment = () => {
  const createNewAppointment = useCallback(
    async (appointmentResponse: AppointmentResponse) => {
      try {
        const createdAppointment = await createAppointment(appointmentResponse);
        return createdAppointment;
      } catch (error) {
        console.error("Error creating appointment:", error);
        return null;
      }
    },
    []
  );

  return { createNewAppointment };
};
