// Updated useLogin hook
import { useState } from "react";
import useAuthContext from "../useAuthContext";

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
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData: LoginError = await response.json();
        setLoading(false);
        setError(errorData);
        return { success: false };
      } else {
        const json: LoginResponse = await response.json();
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