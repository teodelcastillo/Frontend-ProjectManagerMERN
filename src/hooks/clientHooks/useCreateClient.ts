// ./src/hooks/useCreateClient.ts
import { useCallback } from "react";
import { createClient } from "../../services/clientService";

export const useCreateClient = () => {
  const createNewClient = useCallback(
    async (clientName: string) => {
      try {
        const createdClient = await createClient(clientName);
        return createdClient;
      } catch (error) {
        console.error("Error creating client:", error);
        return null;
      }
    },
    []
  );

  return { createNewClient };
};
