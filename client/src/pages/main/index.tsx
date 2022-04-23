import React from 'react'

import { Link, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from 'pages/main/Home'
import AddFriendPage from 'pages/main/friend/Add'
import EditFriendPage from 'pages/main/friend/Edit'
// import Thanks from 'pages/main/Thanks'
import Profile from 'pages/main/user/Profile'
import FriendPage from 'pages/main/friend/Friend'

const renderUser = () => {
  return (
    <Routes>
      <Route path="home" element={<HomePage />}></Route>

      <Route path="friend" element={<FriendPage />}></Route>
      <Route path="friend/add" element={<AddFriendPage />} />
      <Route path="profile" element={<Profile />}></Route>
      <Route path="friend/edit/*" element={<EditFriendPage />}></Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default renderUser
