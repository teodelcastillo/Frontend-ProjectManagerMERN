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
import { Case } from "../data/models";

const CreateAppointment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createNewAppointment } = useCreateAppointment();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null); // Initialize with null
  const [selectedDate, setSelectedDate] = useState(""); // Initialize with empty string

  // Separate states for title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Validation states
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // Callback to handle case selection
  const handleCaseSelect = (selectedCase: Case) => {
    // Update the client state with the selected case
    setSelectedCase(selectedCase);
  };

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

    // Ensure selectedCase is not null before creating the appointment
    if (!selectedCase) {
      console.error("A case must be selected.");
      return;
    }

    // Create a new appointment object to send to the backend
    const newAppointment = {
      appointmentResponse: {
        _id: "",
        title,
        date: selectedDate, // Replace with your selected date value
        description,
        relatedTo: `ObjectID('${selectedCase._id}')`, // Use selectedCase._id as string
      },
    };

    // Call the createNewAppointment function with the newAppointment object
    const createdAppointment = await createNewAppointment(newAppointment);

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
              <FormControl marginBottom={"10px"} isRequired>
                <FormLabel>Causa: {selectedCase?.caseName || "-"}</FormLabel>
                <CaseSelect
                  onSelect={handleCaseSelect} // Pass the handleCaseSelect callback to update the selected case
                  maxCasesToShow={100}
                />
              </FormControl>
              <FormControl
                isInvalid={!!titleError}
                marginBottom={"10px"}
                isRequired
              >
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
              <FormControl marginBottom={"10px"} isRequired>
                <FormLabel>Dia y hora</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
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
