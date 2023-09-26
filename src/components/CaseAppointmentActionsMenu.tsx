import { CheckIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { HStack, Button } from "@chakra-ui/react";

const CaseAppointmentActionsMenu = () => {
  return (
    <HStack>
      <Button size={"sm"}>
        <InfoOutlineIcon />
      </Button>
      <Button size={"sm"}>
        <CheckIcon />
      </Button>
    </HStack>
  );
};

export default CaseAppointmentActionsMenu;
