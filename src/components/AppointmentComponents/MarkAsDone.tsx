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
import React from "react";
import useAuthContext from "../../hooks/useAuthContext";

const MarkAsDone = () => {
  const { state } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <Input placeholder="Detalle de actividad" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="red" mr={3}>
              Cancelar
            </Button>
            <Button colorScheme="blue" w={"94.11px"}>
              Hecho
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MarkAsDone;
