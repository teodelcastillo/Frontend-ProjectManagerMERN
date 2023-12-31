// Updated LoginForm component
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useLogin } from "../../hooks/usersHooks/useLogin";
import HomeNavBar from "../homePageComponents/HomeNavBar";

const LoginForm = () => {
  const { login, isLoading, error } = useLogin();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(formData.username, formData.password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{error.error}</AlertTitle>
          </Alert>
        )}
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleInputChange}
            value={formData.username}
          />
        </FormControl>
        <FormControl isRequired marginBottom={"10px"}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInputChange}
            value={formData.password}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" isLoading={isLoading}>
          Sign In
        </Button>{" "}
      </form>
    </>
  );
};

export default LoginForm;
