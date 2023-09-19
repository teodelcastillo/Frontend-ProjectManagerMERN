import { useEffect } from "react";
import useDataFetching from "./useData"; // Import your useDataFetching hook
import { Appointments } from "../data/models";

const useAppointments = (entityType: string, entityId: string) => {
  // Use the useDataFetching hook to fetch appointments data
  const { data: appointments, error, isLoading } = useDataFetching<Appointments[]>(
    `/appointments?entityType=${entityType}&entityId=${entityId}`
  );

  // You can add additional error handling here if needed

  useEffect(() => {
    // If you need to perform any additional logic when appointments data changes, you can do it here.
  }, [appointments]);

  // Return the appointments data and loading state from useDataFetching
  return { appointments, error, isLoading };
};

export default useAppointments;