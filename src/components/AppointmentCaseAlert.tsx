import { Alert, Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useGetAppointmentsByCaseId } from "../hooks/appointmentsHooks/useAppointmentById";
import CaseAppointmentActionsMenu from "./CaseAppointmentActionsMenu";
import { AddIcon } from "@chakra-ui/icons";
import { Appointment } from "../data/models";

interface Props {
  caseId: string;
}

const AppointmentCaseAlert = ({ caseId }: Props) => {
  const { fetchAppointmentsByCaseId } = useGetAppointmentsByCaseId();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (caseId) {
      fetchAppointmentsByCaseId(caseId).then((appointmentsData) => {
        if (appointmentsData) {
          setAppointments(appointmentsData);
        }
      });
    }
  }, [caseId, fetchAppointmentsByCaseId]);

  // Function to calculate the difference in days between two dates
  const calculateDaysDifference = (date: Date) => {
    const currentDate = new Date();
    const appointmentDate = new Date(date);

    const timeDifference = appointmentDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  };

  return (
    <>
      <Box>
        <HStack justify={"space-between"} h={"24px"} marginBottom={"8px"}>
          <Heading size="sm">Vencimientos</Heading>
          <Button colorScheme="teal" size="xs" borderRadius={"5px"}>
            <AddIcon />
          </Button>
        </HStack>
        <HStack>
          {appointments.map((appointmentItem) => {
            const daysDifference = calculateDaysDifference(
              appointmentItem.date
            );
            let colorScheme = "green";

            if (daysDifference < 0) {
              // The appointment is in the past and not done
              colorScheme = "red";
            } else if (daysDifference === 2 || daysDifference === 0) {
              // The appointment is today or in the next two days and is not done
              colorScheme = "yellow";
            }

            return (
              <Alert
                key={appointmentItem._id}
                justifyContent={"space-between"}
                colorScheme={colorScheme}
              >
                <Text>{appointmentItem.title}</Text>
                <CaseAppointmentActionsMenu appointment={appointmentItem} />
              </Alert>
            );
          })}
        </HStack>
      </Box>
    </>
  );
};

export default AppointmentCaseAlert;
