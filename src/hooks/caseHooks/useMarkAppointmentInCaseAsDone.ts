import { useCallback } from "react";
import { markAppointmentInCaseAsDone } from "../../services/casesService";
import { Case } from "../../data/models";

const useMarkAppointmentInCaseAsDone = () => {
    const markAsDone = useCallback(
      async (caseId: string, appointmentId: string, isDone: boolean, user: string, comment: string): Promise<Case | null> => {
        try {
          const updatedCase = await markAppointmentInCaseAsDone(caseId, appointmentId, isDone, user, comment);
          return updatedCase;
        } catch (error) {
          console.error("Error marking appointment as done:", error);
          return null;
        }
      },
      []
    );
  
    return { markAsDone };
  }

  export default useMarkAppointmentInCaseAsDone