// .src/hooks/caseHooks/useDeleteCaseById.ts

import { useCallback } from "react";
import { deleteCaseById } from "../../services/casesService";

export const useDeleteCaseById = () => {

    const deleteCase = useCallback(
        async (id: string) => {
        try {
            const deletedCase = await deleteCaseById(id);
            return deletedCase;
        } catch (error) {
            console.error("Error deleting case:", error);
            return null;
        }
        },
        []
    );
    
    return { deleteCase };
}