import axiosInstance from "./axios";
import { Appointment } from "../data/models";

// Function to create a new appointment
export const createAppointment = async (appointmentResponse: Appointment): Promise<Appointment | null> => {
  console.log("Request Data:", appointmentResponse);

  try {
    const response = await axiosInstance.post<Appointment>("appointments", appointmentResponse);
    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    return null;
  }
}



export const getAllAppointment = async (): Promise<Appointment[]> => {

    try {
      const response = await axiosInstance.get("/appointments");
      return response.data as Appointment[];
    } catch (error) {
      console.error("Error fetching appointment:", error);
      return [];
    }
}

export const getAppointmentById = async (appointmentId: string): Promise<Appointment | null> => {

    try {
      const response = await axiosInstance.get(`/appointments/${appointmentId}`);
      return response.data as Appointment;
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
      return null;
    }

}

export const updateAppointmentById = async (appointmentId: string): Promise<Appointment | null> => {

    try {
      const response = await axiosInstance.put(`/appointments/${appointmentId}`);
      return response.data as Appointment;
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

export const getAppointmentByDate = async (appointmentDate: string): Promise<Appointment | null> => {

    try {
      const response = await axiosInstance.get(`/appointments/${appointmentDate}`);
      return response.data as Appointment;
    } catch (error) {
      console.error("Error fetching appointment by date:", error);
      return null;
    }

}


export const getAppointmentByCaseId = async (caseId: string): Promise<Appointment[] | null> => {
  try {
    const response = await axiosInstance.get(`/cases/${caseId}/appointments`);
    return response.data as Appointment[];
  } catch (error) {
    console.error("Error fetching appointment by case ID:", error);
    return null;
  }
}

// Function to mark an appointment as done with a comment
export const markAppointmentAsDone = async (
  appointmentId: string,
  isDone: boolean,
  user: string,
  comment: string
): Promise<Appointment | null> => {
  try {
    const response = await axiosInstance.put(`/appointments/${appointmentId}/isDone`, {
      isDone,
      comment,
      user,
    });
    return response.data as Appointment;
  } catch (error) {
    console.error("Error marking appointment as done:", error);
    return null;
  }
};
