import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Container,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "./calendarComponents/Calendar";
import { useCreateAppointment } from "../hooks/appointmentsHooks/useCreateAppointment";

const CreateAppointment = () => {
  const [input, setInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleInputChange = (e) => setInput(e.target.value);
  const isError = input === "";
  const { createNewAppointment } = useCreateAppointment();

  // State to store appointment data
  const [appointmentData, setAppointmentData] = useState({
    title: "",
    description: "",
  });

  // Handle input changes for appointment data
  const handleAppointmentDataChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  // Function to create a new appointment
  const handleCreateAppointment = async () => {
    try {
      // Check if required fields are filled
      if (!appointmentData.title || !appointmentData.description) {
        // Handle error here (e.g., show a message to the user)
        console.error("Title and description are required.");
        return;
      }

      // Call the createNewAppointment function with appointmentData
      const createdAppointment = await createNewAppointment(appointmentData);

      if (createdAppointment) {
        // Handle success (e.g., close the modal)
        onClose();
      } else {
        // Handle error here (e.g., show a message to the user)
        console.error("Error creating appointment.");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>NUEVO VENCIMIENTO</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informacion del vencimiento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container
              overflow="auto"
              display={"flex"}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <FormControl isInvalid={isError} marginBottom={"10px"}>
                <FormLabel>Titulo</FormLabel>
                <Input
                  type="title"
                  value={input}
                  onChange={handleInputChange}
                />
                {!isError ? (
                  <FormHelperText>
                    Ingrese el titulo del vencimiento.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Titulo es obligatorio.</FormErrorMessage>
                )}
                <FormLabel>Descripcion</FormLabel>
                <Input
                  type="description"
                  value={input}
                  onChange={handleInputChange}
                />
                {!isError ? (
                  <FormHelperText>
                    Ingrese la descripcion del vencimiento.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>
                    La descripcion es obligatoria.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Calendar />
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
