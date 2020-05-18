import Idea from './Idea'
import InvalidParam from '../errors/InvalidParam'

// for simplicity we use in-memory storage, for a real data storage this file needs to be edited
const ideas: Idea[] = []

export const insert = async (idea: Idea): Promise<number> => {
  ideas.push(idea)

  return ideas.length
}

export const find = async (id: string): Promise<Idea | null> => {
  const idea = ideas.find((i: Idea) => i.id === id)

  return idea || null
}

export const findAll = async (page: number): Promise<Idea[]> => {
  const start = (page - 1) * 10

  return ideas
    .slice(start, start + 10)
    .sort((a, b) => b.averageScore - a.averageScore)
}

export const remove = async (id: string): Promise<void> => {
  const index = ideas.findIndex((i: Idea) => i.id === id)

  if (index >= 0) {
    ideas.splice(index, 1)
  } else {
    throw new InvalidParam('Cannot find the idea by id')
  }
}
