import { HStack } from "@chakra-ui/react";
import AppintmentModalInformation from "./AppintmentModalInformation";
import { Appointment } from "../../data/models";
import MarkAsDone from "./MarkAsDone";

interface Props {
  appointment: Appointment;
}

const CaseAppointmentActionsMenu = ({ appointment }: Props) => {
  console.log("appointment", appointment);
  return (
    <HStack>
      <AppintmentModalInformation appointment={appointment} />
      <MarkAsDone appointmentId={appointment._id} />
    </HStack>
  );
};

export default CaseAppointmentActionsMenu;
