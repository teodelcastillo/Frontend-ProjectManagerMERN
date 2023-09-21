import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";

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

// Define a function to handle form submission
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  // You can now access formData.username, formData.email, and formData.password here
  console.log(formData);
};

// Define a function to update form data when input values change
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const SignupForm = () => {
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Enter your email</FormLabel>
        <Input
          type="email"
          name="email" // Add name attribute to associate with form data
          placeholder="email"
          onChange={handleInputChange}
          value={formData.email}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Create username</FormLabel>
        <Input
          type="text" // Use "text" for username input
          name="username" // Add name attribute to associate with form data
          placeholder="username"
          onChange={handleInputChange}
          value={formData.username}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Create password</FormLabel>
        <Input
          type="password"
          name="password" // Add name attribute to associate with form data
          placeholder="password"
          onChange={handleInputChange}
          value={formData.password}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
