import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'

import { Credentials, SignInfo, AuthResult } from 'store/auth/types'
import {
  NewFriend,
  Friend,
  FriendsState,
  FriendsResult,
  FriendResult
} from 'store/friend/types'
import { User, UsersResult, UserResult } from 'store/user/types'

const createAxiosInstance = (baseURL: string, timeout: number) => {
  const instance: AxiosInstance = axios.create({
    baseURL
  })

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = {
      'x-access-token': `${localStorage.getItem('token')}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response?.status === 500) {
        toast.error(error.response?.data.data.message)
      }
      if (error.response?.status >= 400 && error.response?.status < 500) {
        toast.error(error.response?.data.data.message)
      }

      throw error
    }
  )

  return instance
}

const gateway = createAxiosInstance('http://localhost:8000/api/', 30000)

const apiService = {
  verify: () => gateway.get<AuthResult>('auth'),
  signup: (credentials: Required<Credentials>) =>
    gateway.post<AuthResult>('auth/signup', credentials),
  signin: (signinfo: Required<SignInfo>) =>
    gateway.post<AuthResult>('auth/signin', signinfo),

  getUsers: () => gateway.get<UsersResult>('users/'),
  getUser: (id: number) => gateway.get<UserResult>('users/' + id),
  createUser: (user: Required<User>) =>
    gateway.post<UsersResult>('users/', user),
  updateUser: (user: Required<User>) =>
    gateway.put<UsersResult>('users/' + user.id, user),
  deleteUser: (id: number) => gateway.delete<UsersResult>('users/' + id),

  createFriend: (newFriend: Required<NewFriend>) =>
    gateway.post<FriendsResult>('friends/', newFriend),
  getFriends: () => gateway.get<FriendsResult>('friends/'),
  getFriendById: (id: number) => gateway.get<FriendResult>('friends/' + id),
  getFriendByEmail: (email: string) =>
    gateway.get<FriendsResult>('friends/get?email=' + email),
  updateFriend: (friend: Required<Friend>) =>
    gateway.put<FriendsResult>('friends/' + friend.id, friend),
  deleteFriend: (id: number) => gateway.delete<FriendsResult>('friends/' + id)
}

export default apiService
