import User from './User'

// for simplicity we use in-memory storage, for a real data storage this file needs to be edited
// passwords should be securely stored
const users: User[] = []

export const insert = async (user: User): Promise<number> => {
  users.push(user)

  return users.length
}

export const find = async (
  email: string,
  passwordHash: string
): Promise<User | null> => {
  const user = users.find(
    (u: User) => u.email === email && u.password === passwordHash
  )

  return user || null
}

export const findBy = async (email: string): Promise<User | null> => {
  const user = users.find((u: User) => u.email === email)

  return user || null
}

export const findById = async (id: string): Promise<User | null> => {
  const user = users.find((u: User) => u.id === id)

  return user || null
}
