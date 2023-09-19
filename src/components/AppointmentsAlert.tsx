import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const AppointmentsAlert = () => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Proximo vencimiento:</AlertTitle>
      <AlertDescription>DINAMIC DATE</AlertDescription>
    </Alert>
  );
};

export default AppointmentsAlert;
