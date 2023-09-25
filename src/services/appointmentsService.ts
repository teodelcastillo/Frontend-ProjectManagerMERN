// ./src/services/appointmentsService.ts

import axiosInstance from "./axios";
import { Appointments } from "../data/models";

interface AppointmentResponse {
  appointmentResponse: Appointments;
}

// Function to create a new appointment
export const createAppointment = async ({appointmentResponse}: AppointmentResponse): Promise<Appointments | null> => {
    try {
      const response = await axiosInstance.post<AppointmentResponse>("/appointments", { appointmentResponse });
      return response.data.appointmentResponse;
    } catch (error) {
      console.error("Error creating appointment:", error);
      return null;
    }

}

export const getAllAppointments = async (): Promise<Appointments[]> => {

    try {
      const response = await axiosInstance.get("/appointments");
      return response.data as Appointments[];
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
}

export const getAppointmentById = async (appointmentId: string): Promise<Appointments | null> => {

    try {
      const response = await axiosInstance.get(`/appointments/${appointmentId}`);
      return response.data as Appointments;
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
      return null;
    }

}

export const updateAppointmentById = async (appointmentId: string): Promise<Appointments | null> => {

    try {
      const response = await axiosInstance.put(`/appointments/${appointmentId}`);
      return response.data as Appointments;
    } catch (error) {
      console.error("Error updating appointment by ID:", error);
      return null;
    }
}

export const deleteAppointmentById = async (appointmentId: string): Promise<boolean> => {

    try {
      await axiosInstance.delete(`/appointments/${appointmentId}`);
      return true;
    } catch (error) {   
      console.error("Error deleting appointment by ID:", error);
      return false;
    }
}