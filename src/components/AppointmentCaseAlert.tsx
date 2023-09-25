import { Box, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useGetAppointmentsByCaseId } from "../hooks/appointmentsHooks/useAppointmentById";
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
        <Heading size="sm">Appointments</Heading>
        <ul>
          {appointments.map((appointment: Appointments) => (
            <li key={appointment._id}>
              <Text>{appointment.description}</Text>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default AppointmentCaseAlert;
