// ./src/hooks/useGetAllClients.ts
import { useCallback } from "react";
import { getAllClients } from "../../services/clientService";

export const useGetAllClients = () => {
  const fetchAllClients = useCallback(async () => {
    try {
      const clients = await getAllClients();
      return clients;
    } catch (error) {
      console.error("Error fetching clients:", error);
      return [];
    }
  }, []);

  return { fetchAllClients };
};
