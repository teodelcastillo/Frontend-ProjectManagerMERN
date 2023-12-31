import { Alert, Box, Stack, Text } from "@chakra-ui/react";
import CaseAppointmentActionsMenu from "./CaseAppointmentActionsMenu";

import { Appointment, Case } from "../../data/models";

interface Props {
  appointments: Appointment[];
  caseId: Case["_id"];
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
    return date.toLocaleString("es-AR", options);
  }
  return ""; // Return an empty string if date is undefined or invalid
};

const AppointmentCaseAlert = ({ appointments, caseId }: Props) => {
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
      new Date(appointmentItem.date)
    );

    let colorScheme = "green";

    if (daysDifference < 0) {
      colorScheme = "red";
    } else if (daysDifference <= 3) {
      colorScheme = "yellow";
    }

    const formattedDate = formatDateTime(new Date(appointmentItem.date));

    return (
      <Alert
        key={`alert-${appointmentItem._id}`}
        justifyContent={"space-between"}
        colorScheme={colorScheme}
        borderRadius={"7px"}
        p={"12px"}
        minH={"72px"}
      >
        <Box>
          <Text as={"b"}>{appointmentItem.title}</Text>
          <Text>{formattedDate}</Text>
        </Box>
        <CaseAppointmentActionsMenu
          appointment={appointmentItem}
          caseId={caseId}
        />
      </Alert>
    );
  });

  return (
    <>
      <Box>
        <Stack h={"250px"} overflow={"auto"}>
          <Text as={"b"}>Vencimientos: {appointmentElements.length}</Text>

          <Stack overflow={"auto"}>{appointmentElements}</Stack>
        </Stack>
      </Box>
    </>
  );
};

export default AppointmentCaseAlert;
