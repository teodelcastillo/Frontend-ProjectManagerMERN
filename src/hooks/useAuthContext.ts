import { useContext } from 'react';
import { AuthContext } from './../context/AuthContextProvider';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useAuthContext is meant to be used inside an Auth context provider');
  }
  return context;
}

export default useAuthContext;
