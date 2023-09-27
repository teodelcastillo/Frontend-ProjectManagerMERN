// ./src/services/casesService.ts
import axiosInstance from "./axios";
import { Case } from "../data/models";

interface CaseResponse {
  caseResponse: Case;
}
export const createCase = async (
  caseClientID: string,
  caseName: string,
  caseID: string,
  caseClient: string,
  caseNumber: string,
  caseJury: string,
  caseLink: string
): Promise<Case | null> => {
  try {
    const response = await axiosInstance.post<CaseResponse>("/cases", {
      caseClientID,
      caseName,
      caseID,
      caseClient,
      caseNumber,
      caseJury,
      caseLink,
    });
    return response.data.caseResponse;
  } catch (error) {
    console.error("Error creating case:", error);
    return null;
  }
};

export const getAllCases = async (
    caseClientID: string,
    caseName: string,
    caseID: string,
    caseClient: string,
    caseNumber: string,
    caseJury: string,
    caseLink: string,
    appointments: []
): Promise<Case[]> => {
    try {
        const response = await axiosInstance.get("/cases", {
            params: {
                caseClientID,
                caseName,
                caseID,
                caseClient,
                caseNumber,
                caseJury,
                caseLink,
                appointments
            },
        });
        return response.data as Case[];
    } catch (error) {
        console.error("Error fetching cases:", error);
        return [];
    }
};

export const getCaseById = async (caseId: string): Promise<Case | null> => {
  try {
    const response = await axiosInstance.get(`/cases/${caseId}`);
    return response.data as Case;
  } catch (error) {
    console.error("Error fetching case by ID:", error);
    return null;
  }
}

export const updateCaseById = async(
    caseId: string,
    caseClientID: string,
    caseName: string,
    caseID: string,
    caseClient: string,
    caseNumber: string,
    caseJury: string,
    caseLink: string
): Promise<Case | null> => {
    try {
        const response = await axiosInstance.put(`/cases/${caseId}`, {
            caseClientID,
            caseName,
            caseID,
            caseClient,
            caseNumber,
            caseJury,
            caseLink,
        });
        return response.data as Case;
    } catch (error) {
        console.error("Error updating case by ID:", error);
        return null;
    }
}

export const deleteCaseById = async (caseId: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/cases/${caseId}`);
    return true;
  } catch (error) {
    console.error("Error deleting case by ID:", error);
    return false;
  }
}

export const getCasesWithAppointments = async (): Promise<Case[]> => {
  try {
    const response = await axiosInstance.get("/cases/appointments");
    return response.data as Case[];
  } catch (error) {
    console.error("Error fetching cases:", error);
    return [];
  }
};
