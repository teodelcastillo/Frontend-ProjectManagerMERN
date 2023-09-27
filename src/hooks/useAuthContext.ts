import { AuthContext } from './../context/AuthContextProvider';
import { useContext } from 'react';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useAuthContext is meant to be used inside an Auth context provider');
  }
  console.log('AuthContext value:', context); 
  return context;
}

export default useAuthContext;
