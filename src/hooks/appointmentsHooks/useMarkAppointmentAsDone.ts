import { useCallback } from "react";
import { markAppointmentAsDone } from "../../services/appointmentsService"; // Adjust the path as needed
import { Appointment } from "../../data/models"; // Adjust the path as needed

export const useMarkAppointmentAsDone = () => {
    const markAsDone = useCallback(
      async (appointmentId: string, isDone: boolean, user: string, comment: string, relatedTo: string): Promise<Appointment | null> => {
        try {
          const updatedAppointment = await markAppointmentAsDone(appointmentId, isDone, user, comment, relatedTo);
          return updatedAppointment;
        } catch (error) {
          console.error("Error marking appointment as done:", error);
          return null;
        }
      },
      []
    );
  
    return { markAsDone };
  };
  
  export default useMarkAppointmentAsDone;
