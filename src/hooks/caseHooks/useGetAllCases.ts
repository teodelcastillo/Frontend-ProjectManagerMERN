// ./src/hooks/useGetAllCases.ts
import { useCallback } from "react";
import { getAllCases } from "../../services/casesService";

export const useGetAllCases = () => {
  const fetchAllCases = useCallback(
    async (
      caseClientID: string,
      caseName: string,
      caseID: string,
      caseClient: string,
      caseNumber: string,
      caseJury: string,
      caseLink: string
    ) => {
      try {
        const cases = await getAllCases(
          caseClientID,
          caseName,
          caseID,
          caseClient,
          caseNumber,
          caseJury,
          caseLink
        );
        return cases;
      } catch (error) {
        console.error("Error fetching cases:", error);
        return [];
      }
    },
    []
  );

  return { fetchAllCases };
};
