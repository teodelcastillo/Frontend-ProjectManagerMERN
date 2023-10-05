import { CheckIcon } from "@chakra-ui/icons";
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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useMarkAppointmentAsDone } from "../../hooks/appointmentsHooks/useMarkAppointmentAsDone"; // Import the hook
import { Appointment } from "../../data/models";

interface Props {
  appointmentId: Appointment["_id"];
  relatedTo: Appointment["relatedTo"]; // Assuming you have access to relatedTo
}

const MarkAsDone = ({ appointmentId, relatedTo }: Props) => {
  const { state } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { markAsDone } = useMarkAppointmentAsDone();
  const [comment, setComment] = useState("");

  const user = state.user?.username || "Unknown user";
  console.log("id", appointmentId);

  const handleMarkAsDone = async () => {
    try {
      // Call the markAsDone function with appointmentId, isDone, user, comment, and relatedTo
      const updatedAppointment = await markAsDone(
        appointmentId,
        true,
        user,
        comment,
        relatedTo
      );

      // Handle the response from the backend, e.g., show a success message
      console.log("Appointment marked as done:", updatedAppointment);

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error marking appointment as done:", error);
      // Handle errors here, e.g., show an error message
    }
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button onClick={onOpen}>
        <CheckIcon />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Marcar como hecho</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Usuario</FormLabel>
              <Input ref={initialRef} value={state.user?.username} readOnly />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Comentario</FormLabel>
              <Input
                placeholder="Detalle de actividad"
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Update the comment state
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="red" mr={3}>
              Cancelar
            </Button>
            <Button colorScheme="blue" w={"94.11px"} onClick={handleMarkAsDone}>
              Hecho
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MarkAsDone;
