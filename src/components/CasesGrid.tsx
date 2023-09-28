import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Text,
  Center,
  Tag,
  TagCloseButton,
  Button,
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import CaseCard from "./CaseCard";
import { Case, Appointment } from "../data/models";
import useGetCaseWithAppointments from "../hooks/caseHooks/useGetCaseWithAppointments";

function CaseGrid() {
  const casesWithAppointments = useGetCaseWithAppointments();

  const [casesToShow, setCasesToShow] = useState<Case[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(8);

  // Function to calculate the difference in days between two dates
  const calculateDaysDifference = (date: Date) => {
    const currentDate = new Date();
    const appointmentDate = new Date(date);

    // Calculate the difference in days
    const timeDifference = appointmentDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cases = await casesWithAppointments;

        // Assign an urgency value to each case based on your criteria
        const casesWithUrgency = cases.map((caseItem) => {
          const appointmentDates = caseItem.appointments.map(
            (appointment: Appointment) => appointment.deadlineDate
          );

          const daysDifferences = appointmentDates.map((date) =>
            calculateDaysDifference(new Date(date))
          );

          const minDaysDifference = Math.min(...daysDifferences);

          if (minDaysDifference < 0) {
            return { ...caseItem, urgency: 1 };
          } else if (minDaysDifference <= 3) {
            return { ...caseItem, urgency: 2 };
          } else if (minDaysDifference <= 7) {
            return { ...caseItem, urgency: 3 };
          } else {
            return { ...caseItem, urgency: 4 };
          }
        });

        // Sort cases by urgency (ascending order)
        casesWithUrgency.sort((a, b) => a.urgency - b.urgency);

        setCasesToShow(casesWithUrgency);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [casesWithAppointments]);

  const handleCaseSearch = () => {
    setSearchText(searchText);
  };

  const handleTagClose = () => {
    setSearchText("");
  };

  const loadMoreCases = () => {
    setLimit(limit + 8);
  };

  return (
    <div>
      <SearchInput onSearch={handleCaseSearch} placeholder="Search Cases..." />
      {searchText !== "" && (
        <Tag fontSize="0.8rem">
          {searchText}
          <TagCloseButton onClick={handleTagClose} />
        </Tag>
      )}

      {isLoading && (
        <Center mt="4">
          <Text>Loading...</Text>
        </Center>
      )}

      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} padding="10px" spacing={10}>
        {casesToShow.slice(0, limit).map((caseItem: Case) => (
          <CaseCard key={caseItem._id} caseData={caseItem} />
        ))}
      </SimpleGrid>

      {limit < casesToShow.length && (
        <Center mt="4">
          <Button onClick={loadMoreCases}>Load More</Button>
        </Center>
      )}
    </div>
  );
}

export default CaseGrid;
