// ./src/services/clientService.ts
import axiosInstance from "./axios";
import { Clients } from "../data/models";

interface ClientResponse {

    clientResponse: Clients;
}

// Function to create a new client

export const createClient = async (clientName: string): Promise<Clients | null> => {
    try {
      const response = await axiosInstance.post<ClientResponse>("/clients", { clientName });
      return response.data.clientResponse;
    } catch (error) {
      console.error("Error creating client:", error);
      return null;
    }
  }

  export const getAllClients = async (): Promise<Clients[]> => {
    try {
      const response = await axiosInstance.get("/clients");
      return response.data as Clients[];
    } catch (error) {
      console.error("Error fetching clients:", error);
      return [];
    }
  };
  
  export const getClientById = async (clientId: string): Promise<Clients | null> => {
    try {
      const response = await axiosInstance.get(`/clients/${clientId}`);
      return response.data as Clients;
    } catch (error) {
      console.error("Error fetching client by ID:", error);
      return null;
    }
  };
  
  export const updateClientById = async (
    clientId: string,
    clientName: string
  ): Promise<Clients | null> => {
    try {
      const response = await axiosInstance.put(`/clients/${clientId}`, { clientName });
      return response.data as Clients;
    } catch (error) {
      console.error("Error updating client by ID:", error);
      return null;
    }
  };
  
  export const deleteClientById = async (clientId: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/clients/${clientId}`);
      return true;
    } catch (error) {
      console.error("Error deleting client by ID:", error);
      return false;
    }
  };