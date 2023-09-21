import { useState } from "react";
import useAuthContext from "./useAuthContext";

type LoginError = {
  error: string;
  // You can define more specific error properties here if needed
};

type LoginResponse = {
  user: {
    username: string;
    email: string;
    jwt: string

  };
};

export const useLogin = () => {
  const [error, setError] = useState<LoginError | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, username: string, password: string) => {
    setLoading(true);
    setError(null);

    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const errorData: LoginError = await response.json();
      setLoading(false);
      setError(errorData);

    } else {
      const json: LoginResponse = await response.json();
      localStorage.setItem('user', JSON.stringify(json.user));
      dispatch({ type: 'LOGIN', payload: json.user });
      setLoading(false);

      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      
      // update the auth context

      dispatch({type: 'LOGIN', payload: json})
      setLoading(false)
    }
  };

  return { login, isLoading, error };
};