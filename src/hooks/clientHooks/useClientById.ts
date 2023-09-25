// ./src/hooks/useGetClientById.ts
// ./src/hooks/useUpdateClientById.ts
// ./src/hooks/useDeleteClientById.ts

import { useCallback } from "react";
import {
  getClientById,
  updateClientById,
  deleteClientById,
} from "../../services/clientService";

export const useGetClientById = () => {
  const fetchClientById = useCallback(
    async (clientId: string) => {
      try {
        const client = await getClientById(clientId);
        return client;
      } catch (error) {
        console.error("Error fetching client by ID:", error);
        return null;
      }
    },
    []
  );

  return { fetchClientById };
};

export const useUpdateClientById = () => {
  const updateClient = useCallback(
    async (clientId: string, clientName: string) => {
      try {
        const updatedClient = await updateClientById(clientId, clientName);
        return updatedClient;
      } catch (error) {
        console.error("Error updating client by ID:", error);
        return null;
      }
    },
    []
  );

  return { updateClient };
};

export const useDeleteClientById = () => {
  const deleteClient = useCallback(
    async (clientId: string) => {
      try {
        const success = await deleteClientById(clientId);
        return success;
      } catch (error) {
        console.error("Error deleting client by ID:", error);
        return false;
      }
    },
    []
  );

  return { deleteClient };
};
