import { CheckIcon } from "@chakra-ui/icons";
import { HStack, Button } from "@chakra-ui/react";
import AppintmentModalInformation from "./AppintmentModalInformation";
import { Appointment } from "../data/models";

interface Props {
  appointment: Appointment;
}

const CaseAppointmentActionsMenu = ({ appointment }: Props) => {
  return (
    <HStack>
      <AppintmentModalInformation appointment={appointment} />
      <Button size={"sm"}>
        <CheckIcon />
      </Button>
    </HStack>
  );
};

export default CaseAppointmentActionsMenu;
