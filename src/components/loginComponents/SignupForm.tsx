import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AbsoluteCenter,
  AlertDescription,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import { useSignup } from "../../hooks/useSignup";

import HomeNavBar from "../homePageComponents/HomeNavBar";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const { signup, isLoading, error } = useSignup();

  // Define a TypeScript interface for your component's state
  interface SignupState {
    username: string;
    email: string;
    password: string;
  }

  // Initialize state with an empty object of the defined interface
  const [formData, setFormData] = useState<SignupState>({
    username: "",
    email: "",
    password: "",
  });

  // Track the success state
  const [isSuccess, setIsSuccess] = useState(false);

  // Define a function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the signup function from the useSignup hook with form data
      await signup(formData.email, formData.username, formData.password);
      // If signup is successful, set isSuccess to true
      setIsSuccess(true);
    } catch (error) {
      // Handle any errors here
      setIsSuccess(false);
    }
  };

  // Define a function to update form data when input values change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <HomeNavBar />
      <form className="signup-form" onSubmit={handleSubmit}>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{error.error}</AlertTitle>
          </Alert>
        )}
        {isSuccess && !error && (
          <AbsoluteCenter zIndex={999} axis="both">
            <Alert
              status="success"
              bg={"#c6f6d5"}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="300px"
              width={"300px"}
              borderRadius={"100%"}
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Application submitted!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Do you want to <Link to="/login">log in</Link>
                ?
                <br />
              </AlertDescription>
            </Alert>
          </AbsoluteCenter>
        )}
        <FormControl isRequired>
          <FormLabel>Enter your email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleInputChange}
            value={formData.email}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Create username</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleInputChange}
            value={formData.username}
          />
        </FormControl>
        <FormControl isRequired marginBottom={"10px"}>
          <FormLabel>Create password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInputChange}
            value={formData.password}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" isLoading={isLoading}>
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
