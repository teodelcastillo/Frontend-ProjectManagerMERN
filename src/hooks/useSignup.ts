import { useState } from "react";
import useAuthContext from "./useAuthContext";
import apiClient from "../services/api-client"; // Import your HTTP client

type SignupError = {
  error: string;
};

type SignupResponse = {
  user: {
    username: string;
    email: string;
    jwt: string;
  };
};

export const useSignup = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/users/signup", {
        email,
        username,
        password,
      });

      if (!response.data) {
        const errorData: SignupError = response.data;
        setLoading(false);
        setError(errorData);
      } else {
        const json: SignupResponse = response.data;
        localStorage.setItem("user", JSON.stringify(json.user));
        dispatch({ type: "LOGIN", payload: json.user });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setError({ error: "An error occurred while signing up." });
    }
  };

  return { signup, isLoading, error };
};
