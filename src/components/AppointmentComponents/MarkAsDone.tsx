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
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { useRef } from "react";
import useMarkAppointmentInCaseAsDone from "../../hooks/caseHooks/useMarkAppointmentInCaseAsDone"; // Import your hook

interface Props {
  caseId: string;
  appointmentId: string;
}

const MarkAsDone = ({ caseId, appointmentId }: Props) => {
  // Pass caseId and appointmentId as props
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useAuthContext();
  const [comment, setComment] = useState("");
  const initialRef = useRef();
  const finalRef = useRef();

  const username = state.user?.username || "null";

  const { markAsDone } = useMarkAppointmentInCaseAsDone(); // Use the hook

  const handleMarkAsDone = async () => {
    const updatedCase = await markAsDone(
      caseId,
      appointmentId,
      true,
      username,
      comment
    );

    if (updatedCase) {
      onClose();
    }
  };

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
                onChange={(e) => setComment(e.target.value)}
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
