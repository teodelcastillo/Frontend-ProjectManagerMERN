import { Alert, Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useGetAppointmentsByCaseId } from "../hooks/appointmentsHooks/useAppointmentById";
import CaseAppointmentActionsMenu from "./CaseAppointmentActionsMenu";
import { AddIcon } from "@chakra-ui/icons";
export type Appointments = {
  _id: string;
  description: string;
  // other properties
};

interface Props {
  caseId: string;
}

const AppointmentCaseAlert = ({ caseId }: Props) => {
  const { fetchAppointmentsByCaseId } = useGetAppointmentsByCaseId();
  const [appointments, setAppointments] = useState<Appointments[]>([]);

  useEffect(() => {
    if (caseId) {
      fetchAppointmentsByCaseId(caseId).then((appointmentsData) => {
        if (appointmentsData) {
          setAppointments(appointmentsData);
        }
      });
    }
  }, [caseId, fetchAppointmentsByCaseId]);

  return (
    <>
      <Box>
        <HStack justify={"space-between"}>
          <Heading size="sm">Vencimientos</Heading>
          <Button colorScheme="teal" size="xs" borderRadius={"5px"}>
            <AddIcon />
          </Button>
        </HStack>
        <HStack>
          {appointments.map((appointment: Appointments) => (
            <Alert key={appointment._id}>
              <Text>{appointment.description}</Text>
            </Alert>
          ))}

          <CaseAppointmentActionsMenu />
        </HStack>
      </Box>
    </>
  );
};

export default AppointmentCaseAlert;
