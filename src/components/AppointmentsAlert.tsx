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
      <AlertDescription>Render variable data</AlertDescription>
    </Alert>
  );
};

export default AppointmentsAlert;
