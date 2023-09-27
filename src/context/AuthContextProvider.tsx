import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";
import { NewUser } from "../data/models";

// Define types for your state and action objects
type AuthState = {
  user: NewUser | null;
  isLoading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: NewUser }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: NewUser }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

// Create the initial state for your reducer
const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// Create your context with initial state
type AuthContextType = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextType>({
  state: initialAuthState,
  dispatch: () => undefined, // You can provide a default empty function here
});

// Define your reducer function
const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isLoading: false };
    case "LOGOUT":
      return { ...state, user: null };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

// Create the AuthContextProvider component
type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext State: ", state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
