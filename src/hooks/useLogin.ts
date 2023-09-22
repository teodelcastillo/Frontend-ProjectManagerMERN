// Updated useLogin hook
import { useState } from "react";
import useAuthContext from "./useAuthContext";
import apiClient from "../services/api-client"; // Import your HTTP client

type LoginError = {
  error: string;
};

type LoginResponse = {
  // Modify this type according to the actual response structure
  username: string;
  token: string;
  // Add other properties if needed
};

export const useLogin = () => {
  const [error, setError] = useState<LoginError | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    let success = false;

    try {
      const response = await apiClient.post("/users/login", {
        username,
        password,
      });

      if (!response.data || !response.data.token) {
        const errorData: LoginError = response.data;
        setLoading(false);
        setError(errorData);
      } else {
        const json: LoginResponse = response.data;
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setLoading(false);
        success = true;
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setError({ error: "An error occurred while logging in." });
    }

    return success;
  };

  return { login, isLoading, error };
};
