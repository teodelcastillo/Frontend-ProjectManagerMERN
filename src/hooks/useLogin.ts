import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axiosInstance from "../services/axios"; // Import your Axios instance

type LoginError = {
  error: string;
};

type LoginResponse = {
  username: string;
  token: string;
};

export const useLogin = () => {
  const [error, setError] = useState<LoginError | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/users/login", {
        username,
        password,
      });

      if (!response) {
        setLoading(false);
        setError({ error: "An error occurred while logging in." });
        return { success: false };
      }

      if (!response.data || !response.data.token) {
        const errorData: LoginError = response.data;
        setLoading(false);
        setError(errorData);
        return { success: false };
      } else {
        const json: LoginResponse = response.data;
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setLoading(false);
        return { success: true, user: json };
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setError({ error: "An error occurred while logging in." });
      return { success: false };
    }
  };

  return { login, isLoading, error };
};
