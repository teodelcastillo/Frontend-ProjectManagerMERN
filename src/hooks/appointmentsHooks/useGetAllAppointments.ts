
import { useCallback } from "react";
import { getAllAppointment } from "../../services/appointmentsService";

export const useGetAllAppointments = () => {
  const fetchAllAppointments = useCallback(async () => {
    try {
      const appointments = await getAllAppointment();
      return appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
  }, []);

  return { fetchAllAppointments };
};