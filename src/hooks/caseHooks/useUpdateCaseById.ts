// .src/hooks/caseHooks/useUpdateCaseById.ts

import { useCallback } from "react";
import { updateCaseById } from "../../services/casesService";

export const useUpdateCaseById = () => {

    const updateCase = useCallback(
        async (
        id: string,
        caseClientID: string,
        caseName: string,
        caseID: string,
        caseClient: string,
        caseNumber: string,
        caseJury: string,
        caseLink: string
        ) => {
        try {
            const updatedCase = await updateCaseById(
            id,
            caseClientID,
            caseName,
            caseID,
            caseClient,
            caseNumber,
            caseJury,
            caseLink
            );
            return updatedCase;
        } catch (error) {
            console.error("Error updating case:", error);
            return null;
        }
        },
        []
    );
    
    return { updateCase };
}