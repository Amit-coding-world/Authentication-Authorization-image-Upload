import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { useContext } from 'react'
import { dataContext } from './context/UserContext'

function App() {
  let {userData,setUserData}=useContext(dataContext)
  return (
    <div>
      <Routes>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={userData ? <Home /> : <Login />} />

      </Routes>
    </div>
  )
}

export default App
