import { Alert, Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import CaseAppointmentActionsMenu from "./CaseAppointmentActionsMenu";
import { AddIcon } from "@chakra-ui/icons";
import { Appointment } from "../data/models";

interface Props {
  appointments: Appointment[];
}

// Function to format a date as a string in "DD/MM HH:MM" format
const formatDateTime = (date: Date | undefined) => {
  if (date && !isNaN(date.getTime())) {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  }
  return ""; // Return an empty string if date is undefined or invalid
};

const AppointmentCaseAlert = ({ appointments }: Props) => {
  // Function to calculate the difference in days between two dates
  const calculateDaysDifference = (date: Date) => {
    const currentDate = new Date();
    const appointmentDate = new Date(date);

    // Calculate the difference in days
    const timeDifference = appointmentDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  };

  const appointmentElements = appointments.map((appointmentItem) => {
    const daysDifference = calculateDaysDifference(
      new Date(appointmentItem.deadlineDate)
    );

    let colorScheme = "green";

    if (daysDifference < 0) {
      colorScheme = "red";
    } else if (daysDifference <= 3) {
      colorScheme = "yellow";
    }

    const formattedDate = formatDateTime(
      new Date(appointmentItem.deadlineDate)
    );

    return (
      <Alert
        key={`alert-${appointmentItem._id}`} // Assign a unique key
        justifyContent={"space-between"}
        colorScheme={colorScheme}
      >
        <Box>
          <Text as={"b"}>{appointmentItem.title}</Text>
          <Text>{formattedDate}</Text>
        </Box>
        <CaseAppointmentActionsMenu appointment={appointmentItem} />
      </Alert>
    );
  });

  return (
    <>
      <Box>
        <HStack justify={"space-between"} h={"24px"} marginBottom={"8px"}>
          <Heading size="sm">Vencimientos</Heading>
          <Button colorScheme="teal" size="xs" borderRadius={"5px"}>
            <AddIcon />
          </Button>
        </HStack>
        <HStack>{appointmentElements}</HStack>
      </Box>
    </>
  );
};

export default AppointmentCaseAlert;
