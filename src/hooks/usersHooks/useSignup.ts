import { useState } from "react";
import useAuthContext from "../useAuthContext";

type SignupError = {
  error: string;
  // You can define more specific error properties here if needed
};

type SignupResponse = {
  user: {
    username: string;
    email: string;
    jwt: string

  };
};

export const useSignup = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, username: string, password: string) => {
    setLoading(true);
    setError(null);

    const response = await fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const errorData: SignupError = await response.json();
      setLoading(false);
      setError(errorData);

    } else {
      const json: SignupResponse = await response.json();
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

  return { signup, isLoading, error };
};