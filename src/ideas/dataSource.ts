import Idea from './Idea'

// for simplicity we use in-memory storage, for real data storage this file needs to be edited
const ideas: Idea[] = []

export const insert = async (idea: Idea): Promise<number> => {
  ideas.push(idea)

  return ideas.length
}

export const find = async (id: string): Promise<Idea | null> => {
  const idea = ideas.find((i: Idea) => i.id === id)

  return idea || null
}

export const findAll = async (): Promise<Idea[]> => {
  return ideas
}
