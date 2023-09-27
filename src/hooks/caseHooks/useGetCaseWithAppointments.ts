// useCasesWithAppointments.js
import { useState, useEffect } from "react";
import { getCasesWithAppointments } from "../../services/casesService";
import { Case } from "../../data/models";

function useCasesWithAppointments() {
    const [cases, setCases] = useState<Case[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const casesWithAppointments = await getCasesWithAppointments();
            setCases(casesWithAppointments); 
        };

        fetchData();
    }, []);

    return cases;
}

export default useCasesWithAppointments;
