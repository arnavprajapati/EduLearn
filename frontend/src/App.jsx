import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { ToastContainer } from 'react-toastify'
import { getCurrentUser } from './hooks/getCurrentUser.js'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

export const serverURL = 'http://localhost:5000'

const App = () => {
  const { userData } = useSelector((state) => state.user)
  getCurrentUser()
  console.log("userdata: ", userData);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route
          path='/signup'
          element={userData ? <Navigate to='/' /> : <SignUpPage />}
        />

        <Route
          path='/login'
          element={userData ? <Navigate to='/' /> : <LoginPage />}
        />

        <Route
          path='/profile'
          element={userData ? <Profile /> : <Navigate to='/login' />}
        />

        <Route
          path='/forgot-password'
          element={<ForgotPassword />}
        />

      </Routes>
    </>
  )
}

export default App