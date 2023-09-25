// ./src/hooks/useCreateCase.ts
import { useCallback } from "react";
import { createCase } from "../../services/casesService";

export const useCreateCase = () => {
  const createNewCase = useCallback(
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
        const createdCase = await createCase(
          caseClientID,
          caseName,
          caseID,
          caseClient,
          caseNumber,
          caseJury,
          caseLink
        );
        return createdCase;
      } catch (error) {
        console.error("Error creating case:", error);
        return null;
      }
    },
    []
  );

  return { createNewCase };
};
