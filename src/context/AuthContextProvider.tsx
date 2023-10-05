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
};

type AuthAction = {
  type: string;
  payload?: any; // Replace 'any' with the appropriate payload type if needed
};

// Create the initial state for your reducer
const initialAuthState: AuthState = {
  user: null,
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
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
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

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
