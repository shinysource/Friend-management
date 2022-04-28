export interface Credentials {
  username: string
  email: string
  password: string
}

export interface SignInfo {
  email: string
  password: string
}

export interface User {
  id: number
  username: string
  email: string
  password: string
  roleId: string
}

export interface AuthState {
  user: User
  errors?: string
  loading: boolean
  verified: boolean
  checked: boolean
}

export interface AuthResult {
  data: {
    user: User
    token: string
    message: string
  }
}
