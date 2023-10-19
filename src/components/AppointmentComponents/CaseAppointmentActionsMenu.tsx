import { HStack } from "@chakra-ui/react";
import AppintmentModalInformation from "./AppintmentModalInformation";
import { Appointment } from "../../data/models";
import MarkAsDone from "./MarkAsDone";

interface Props {
  appointment: Appointment;
  caseId: string;
}

const CaseAppointmentActionsMenu = ({ appointment, caseId }: Props) => {
  console.log("appointment", appointment);
  return (
    <HStack>
      <AppintmentModalInformation appointment={appointment} />
      <MarkAsDone appointmentId={appointment._id} caseId={caseId} />
    </HStack>
  );
};

export default CaseAppointmentActionsMenu;
