import { useEffect, useState } from "react";
import { getCasesWithAppointments } from "../../services/casesService";
import { Case } from "../../data/models";

function useCasesWithAppointments() {
    const [cases, setCases] = useState<Case[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const casesWithAppointments = await getCasesWithAppointments();
            // Sort the cases by urgency here
            const sortedCases = sortCasesByUrgency(casesWithAppointments);
            setCases(sortedCases);
        };

        fetchData();
    }, []);

    return cases;
}

// Sorting function
function sortCasesByUrgency(cases: Case[]): Case[] {
    const now = new Date();
    return cases.sort((a, b) => {
        // Calculate the urgency score for each case based on your criteria
        const urgencyScoreA = calculateUrgencyScore(a, now);
        const urgencyScoreB = calculateUrgencyScore(b, now);

        // Sort by urgency score in ascending order (change to descending if needed)
        return urgencyScoreA - urgencyScoreB;
    });
}

// Calculate urgency score based on your criteria (expired, today, this week, more than a week)
function calculateUrgencyScore(caseItem: Case, now: Date): number {
    const appointmentDates = caseItem.appointments.map((appointment) =>
        new Date(appointment.date)
    );

    const minDistance = Math.min(
        ...appointmentDates.map((date) => Math.abs(date.getTime() - now.getTime()))
    );

    // Define your scoring logic here based on the minimum distance
    if (minDistance < 0) {
        // Expired
        return 1;
    } else if (minDistance < 24 * 60 * 60 * 1000) {
        // Today
        return 2;
    } else if (minDistance < 7 * 24 * 60 * 60 * 1000) {
        // This week
        return 3;
    } else {
        // More than a week
        return 4;
    }
}

export default useCasesWithAppointments;