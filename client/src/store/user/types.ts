export interface User {
  id: number
  username: string
  email: string
  password: string
}

export interface UsersState {
  users: User[]
  loading: boolean
  updated: boolean
}

export interface UsersResult {
  data: {
    users: User[]
    message: string
  }
}
