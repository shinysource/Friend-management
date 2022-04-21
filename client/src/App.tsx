import React, { useEffect } from 'react'
import * as Mui from '@mui/material'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import SignupPage from './pages/auth/Signup'

const App = () => {
  const navigate = useNavigate()

  const renderAuth = () => {
    return (
      <Routes>
        <Route path="/registration" element={<SignupPage />}></Route>

        <Route path="*" element={<Navigate to="/registration" replace />} />
      </Routes>
    )
  }

  const renderMain = () => {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    )
  }
  return (
    <>
      <div>
        <ToastContainer />
        {renderAuth()}
      </div>
    </>
  )
}

export default App
