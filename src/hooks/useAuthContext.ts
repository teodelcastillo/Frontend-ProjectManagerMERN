import { AuthContext } from './../context/AuthContextProvider';

import {useContext} from 'react'

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('useAuthContext its ment to be used inside a  Auth context provider')
  }
  
  
    return (
    context
  )
}

export default useAuthContext