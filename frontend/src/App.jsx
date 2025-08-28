import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { ToastContainer } from 'react-toastify'

export const serverURL = 'http://localhost:5000'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App