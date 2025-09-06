import React from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { ToastContainer } from 'react-toastify'
import { getCurrentUser } from './hooks/getCurrentUser.js'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Navbar from './components/Navbar.jsx'

export const serverURL = 'http://localhost:5000'

const App = () => {
  const { userData } = useSelector((state) => state.user)
  const location = useLocation()

  getCurrentUser()
  console.log("userdata: ", userData);

  const hideNavbarRoutes = ['/login', '/signup', '/forgot-password']
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      {shouldShowNavbar && <Navbar />}
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
          path='/edit-profile'
          element={userData ? <EditProfile /> : <Navigate to='/login' />}
        />

        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default App
