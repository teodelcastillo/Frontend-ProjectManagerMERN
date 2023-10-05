import { HStack, Button } from "@chakra-ui/react";
import AppintmentModalInformation from "./AppintmentModalInformation";
import { Appointment } from "../../data/models";
import MarkAsDone from "./MarkAsDone";

interface Props {
  appointment: Appointment;
}

const CaseAppointmentActionsMenu = ({ appointment }: Props) => {
  return (
    <HStack>
      <AppintmentModalInformation appointment={appointment} />
      <MarkAsDone />
    </HStack>
  );
};

export default CaseAppointmentActionsMenu;
