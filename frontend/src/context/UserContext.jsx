import React from 'react'
import { createContext } from 'react'

export const dataContext= createContext()
function UserContext({ children }) {
    const serverUrl="http://localhost:8000"
    const values={serverUrl}
  return (
    <dataContext.Provider value={values}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext
