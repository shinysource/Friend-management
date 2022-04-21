export interface NewFriend {
  friendname: string
  email: string
  gender: string
  age: number
  hobbies: string
  description: string
}

export interface Friend {
  id: number
  email: string
  gender: string
  age: number
  hobbies: string
  description: string
  userId: number
}

export interface FriendState {
  friends: Friend[]
  errors?: string
  loading: boolean
  updated: boolean
}

export interface FriendResult {
  data: {
    friends: Friend[]
    message: string
  }
}
