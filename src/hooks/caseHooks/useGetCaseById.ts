// ./src/hooks/useGetCaseById.ts

import { useCallback } from "react";
import { getCaseById } from "../../services/casesService";

export const useGetCaseById = () => {
  const fetchCaseById = useCallback(
    async (id: string) => {
      try {
        const caseById = await getCaseById(id);
        return caseById;
      } catch (error) {
        console.error("Error fetching case by id:", error);
        return null;
      }
    },
    []
  );

  return { fetchCaseById };
}