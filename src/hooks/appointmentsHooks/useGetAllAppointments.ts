
import { useCallback } from "react";
import { getAllAppointments } from "../../services/appointmentsService";

export const useGetAllAppointments = () => {
  const fetchAllAppointments = useCallback(async () => {
    try {
      const appointments = await getAllAppointments();
      return appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
  }, []);

  return { fetchAllAppointments };
};