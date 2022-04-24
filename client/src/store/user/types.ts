export interface User {
  id: number
  username: string
  email: string
  password: string
}

export interface UsersState {
  users: {
    data: User[]
  }
  user: {
    data: User
  }
  loading: boolean
  updated: boolean
}

export interface UsersResult {
  data: {
    users: User[]
    message: string
  }
}

export interface UserResult {
  data: {
    user: User
    message: string
  }
}
