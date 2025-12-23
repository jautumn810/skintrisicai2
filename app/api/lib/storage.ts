// Shared in-memory storage for user data
// In production, replace this with a database (PostgreSQL, MongoDB, etc.)

export interface UserAttributes {
  demographics?: {
    gender?: string
    ethnicity?: string
    [key: string]: any
  }
  age?: number
  scores?: {
    skinHealth?: number
    hydration?: number
    texture?: number
    [key: string]: any
  }
  room?: string
  page?: string
  plausibility?: number
  week?: number
  skinType?: string
  cosmeticConcerns?: string[]
  weather?: string
  [key: string]: any
}

export interface User {
  id: string
  name: string
  attributes?: UserAttributes
}

// In-memory storage
let userData: User[] = []

export const storage = {
  // Create a new user
  createUser: (name: string): User => {
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newUser: User = {
      id: userId,
      name: name.trim(),
      attributes: {},
    }
    userData.push(newUser)
    return newUser
  },

  // Get user by ID
  getUserById: (userId: string): User | undefined => {
    return userData.find((u) => u.id === userId)
  },

  // Update user attributes
  updateUserAttributes: (userId: string, attributes: UserAttributes): User | null => {
    const userIndex = userData.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return null
    }
    userData[userIndex].attributes = {
      ...userData[userIndex].attributes,
      ...attributes,
    }
    return userData[userIndex]
  },

  // Get all users (for debugging)
  getAllUsers: (): User[] => {
    return [...userData]
  },

  // Clear all users (for testing)
  clearAll: (): void => {
    userData = []
  },
}

