import User from './User'

// for simplicity we use in-memory storage, for a real data storage this file needs to be edited
const users: User[] = []

export const insert = async (user: User): Promise<number> => {
  users.push(user)

  return users.length
}

export const find = async (id: string): Promise<User | null> => {
  const user = users.find((u: User) => u.id === id)

  return user || null
}

export const findBy = async (email: string): Promise<User | null> => {
  const user = users.find((u: User) => u.email === email)

  return user || null
}
