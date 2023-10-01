import { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Container,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCreateAppointment } from "../hooks/appointmentsHooks/useCreateAppointment";
import CaseSelect from "./caseComponents/CaseSelect";

const CreateAppointment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createNewAppointment } = useCreateAppointment();

  // Separate states for title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Validation states
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // Function to create a new appointment
  const handleCreateAppointment = async () => {
    // Reset previous error messages
    setTitleError("");
    setDescriptionError("");

    // Check if required fields are filled
    if (!title) {
      setTitleError("Title is required.");
      return;
    }

    if (!description) {
      setDescriptionError("Description is required.");
      return;
    }

    // Call the createNewAppointment function with title and description
    const createdAppointment = await createNewAppointment({
      title,
      description,
    });

    if (createdAppointment) {
      // Clear input fields and close the modal
      setTitle("");
      setDescription("");
      onClose();
    } else {
      // Handle error here (e.g., show a message to the user)
      console.error("Error creating appointment.");
    }
  };

  return (
    <>
      <Button onClick={onOpen}>NUEVO VENCIMIENTO</Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo vencimiento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container
              overflow="auto"
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <FormControl isInvalid={!!titleError} marginBottom={"10px"}>
                <FormControl marginBottom={"10px"}>
                  <FormLabel>Causa relacionada</FormLabel>
                  <CaseSelect onClientSelect={() => {}} maxCasesToShow={100} />
                </FormControl>
                <FormLabel>Titulo</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {titleError && (
                  <FormErrorMessage>{titleError}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!descriptionError} marginBottom={"10px"}>
                <FormLabel>Descripcion</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {descriptionError && (
                  <FormErrorMessage>{descriptionError}</FormErrorMessage>
                )}
              </FormControl>
            </Container>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose} width={"95px"}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreateAppointment}
              width={"95px"}
            >
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateAppointment;
