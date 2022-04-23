import React from 'react'

import { Link, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from 'pages/main/Home'
import FriendPage from 'pages/main/friend/Friend'
import AddFriendPage from 'pages/main/friend/Add'
import EditFriendPage from 'pages/main/friend/Edit'
import Profile from 'pages/main/user/Profile'

import AddAdminFriendPage from 'pages/main/admin/friend/Add'
import EditAdminFriendPage from 'pages/main/admin/friend/Edit'
import AdminFriendPage from 'pages/main/admin/friend/Friend'
// import AddAdminFriendPage from 'pages/main/admin/user/Add'
// import EditAdminFriendPage from 'pages/main/admin/user/Edit'
import AdminUserPage from 'pages/main/admin/user/User'
import AdminProfile from 'pages/main/admin/user/Profile'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { RootState } from 'store/store'

const Main = () => {
  const { user } = useAppSelector((state: RootState) => state.auth)

  const renderAdmin = () => {
    return (
      <Routes>
        <Route path="home" element={<HomePage />}></Route>

        <Route path="friend" element={<AdminFriendPage />}></Route>
        <Route path="friend/add" element={<AddAdminFriendPage />} />
        <Route path="friend/edit/*" element={<EditAdminFriendPage />}></Route>

        <Route path="profile" element={<AdminProfile />}></Route>

        <Route path="user" element={<AdminUserPage />}></Route>
        {/* <Route path="user/add" element={<AddAdminUserPage />} />
        <Route path="user/edit/*" element={<EditAdminUserPage />}></Route> */}

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    )
  }

  const renderUser = () => {
    return (
      <Routes>
        <Route path="home" element={<HomePage />}></Route>

        <Route path="friend" element={<FriendPage />}></Route>
        <Route path="friend/add" element={<AddFriendPage />} />
        <Route path="friend/edit/*" element={<EditFriendPage />}></Route>
        <Route path="profile" element={<Profile />}></Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    )
  }

  const renderMain = () => {
    switch (user.roles) {
      case 'admin':
        return renderAdmin()
      case 'user':
        return renderUser()
      default:
        return renderUser()
    }
  }

  return renderMain()
}

export default Main
