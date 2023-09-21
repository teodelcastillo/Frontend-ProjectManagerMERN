import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";

const LoginForm = () => {
  // Define a TypeScript interface for your component's state
  interface LoginState {
    username: string;
    password: string;
  }

  // Initialize state with an empty object of the defined interface
  const [formData, setFormData] = useState<LoginState>({
    username: "",
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

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="text" // Use "text" for username input
          name="username" // Add name attribute to associate with form data
          placeholder="username"
          onChange={handleInputChange}
          value={formData.username}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password" // Add name attribute to associate with form data
          placeholder="password"
          onChange={handleInputChange}
          value={formData.password}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
