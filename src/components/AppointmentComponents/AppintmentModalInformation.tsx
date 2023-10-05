// AppintmentModalInformation.tsx

import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Appointment } from "../../data/models";

interface Props {
  appointment: Appointment;
}

const AppintmentModalInformation = ({ appointment }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const formattedDate =
    appointment.date && !isNaN(Date.parse(appointment.date))
      ? new Date(appointment.date).toLocaleString()
      : "Date not available";

  return (
    <>
      <Button size={"sm"} onClick={onOpen}>
        <InfoOutlineIcon />
      </Button>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{appointment.title}</ModalHeader>
          <ModalHeader>{formattedDate}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{appointment.description}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">View in calendar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppintmentModalInformation;
