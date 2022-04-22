import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'

import { Credentials, SignInfo, AuthResult } from 'store/auth/types'
import {
  NewFriend,
  Friend,
  FriendsState,
  FriendsResult
} from 'store/friend/types'

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

  createFriend: (newFriend: Required<NewFriend>) =>
    gateway.post<FriendsResult>('friends/', newFriend),
  getFriend: () => gateway.get<FriendsResult>('friends'),
  getFriendByUserId: (userId: number) =>
    gateway.get<FriendsResult>('friends/' + userId),
  getFriendById: (id: number) => gateway.get<FriendsResult>('friends/id/' + id),
  updateFriend: (friend: Required<Friend>) =>
    gateway.put<FriendsResult>('friends/' + friend.id, friend),
  deleteFriend: (id: number) => gateway.delete<FriendsResult>('friends/' + id)
}

export default apiService
