import React, { useEffect } from 'react'
import * as Mui from '@mui/material'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { useAppDispatch, useAppSelector } from './store/hooks'
import { RootState } from './store/store'
import { verify, setChecked, setVerified } from './store/auth'

import SignupPage from './pages/auth/Signup'
import SigninPage from './pages/auth/Signin'
import Main from 'pages/main'

const App = () => {
  const { user, loading, checked, verified } = useAppSelector(
    (state: RootState) => state.auth
  )
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!verified && localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'))
      dispatch(verify())
    } else {
      dispatch(setVerified(true))
    }
  }, [dispatch, user, verified])

  const renderAuth = () => {
    return (
      <Routes>
        <Route path="/registration" element={<SignupPage />}></Route>
        <Route path="/login" element={<SigninPage />}></Route>

        <Route path="*" element={<Navigate to="/registration" replace />} />
      </Routes>
    )
  }

  const renderMain = () => {
    return (
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    )
  }
  return (
    <>
      {!verified || loading ? (
        <Mui.CircularProgress />
      ) : (
        <div>
          <ToastContainer />
          {checked ? renderMain() : renderAuth()}
        </div>
      )}
    </>
  )
}

export default App
