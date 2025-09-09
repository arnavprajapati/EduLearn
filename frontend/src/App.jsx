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
import Dashboard from './pages/Educator/Dashboard.jsx'
import CreateCourse from './pages/Educator/CreateCourse.jsx'
import Courses from './pages/Educator/Courses.jsx'
import EditCourse from './pages/Educator/EditCourse.jsx'
import getCreatorCourseData from './hooks/getCreatorCourse.js'
import getCourseData from './hooks/getCourseData.js'
import AllCourses from './pages/AllCourses.jsx'
import CreateLecture from './pages/Educator/CreateLecture.jsx'
import EditLecture from './pages/Educator/EditLecture.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import ViewLecture from './pages/ViewLecture.jsx'
import { useEffect } from 'react'

export const serverURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://edulearn-i65q.onrender.com';

const App = () => {
  const { userData } = useSelector((state) => state.user)
  const location = useLocation(

    useEffect(() => {
      getCurrentUser();
      getCreatorCourseData();
      getCourseData();
    }, [])
  )

  console.log("userdata: ", userData);

  const hideNavbarRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/dashboard',
    '/create-course',
    '/courses',
  ]

  const shouldShowNavbar = !(
    hideNavbarRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/edit-course/') ||
    location.pathname.startsWith('/create-lecture/') ||
    location.pathname.startsWith('/edit-lecture/') ||
    location.pathname.startsWith('/view-course/') ||
    location.pathname.startsWith('/view-lecture/')
  )

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

        <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/login"} />} />

        <Route
          path='/all-courses'
          element={userData ? <AllCourses /> : <Navigate to='/login' />}
        />

        <Route path='/create-course' element={userData?.role === "educator" ? <CreateCourse /> : <Navigate to={"/login"} />} />

        <Route path='/courses' element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/login"} />} />

        <Route path='/edit-course/:courseId' element={userData?.role === "educator" ? <EditCourse /> : <Navigate to={"/login"} />} />

        <Route path='/create-lecture/:courseId' element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/login"} />} />

        <Route path='/edit-lecture/:courseId/:lectureId' element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/login"} />} />

        <Route path='/view-course/:courseId' element={<ViewCourse />} />

        <Route path='/view-lecture/:courseId' element={userData ? <ViewLecture /> : <Navigate to={"/login"} />} />

      </Routes>
    </>
  )
}

export default App
