import { useShallow } from 'zustand/react/shallow'
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const sortByVotes = (arr) => arr.toSorted((a, b) => b.votes - a.votes)
const filterResult = (arr, filter) => arr.filter(
  a => filter
  ? a.content.toUpperCase().includes(filter.toUpperCase())
  : true
) 

const asObject = anecdote => ({
  content: anecdote,
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: id => set(state => ({
      anecdotes: (state.anecdotes.map(
        a => a.id === id ? { ...a, votes: a.votes + 1 } : a
      ))
    })),
    add: async content => {
      const anecdote = await anecdoteService.create(content)
      set(state => ({ anecdotes: [...state.anecdotes, anecdote]}))
    },
    setFilter: value => set(() => ({ filter: value })),
    init: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(()=> ({ anecdotes }))
    }
  }
}))

export const useAnecdotes = () => useAnecdoteStore(useShallow((state) => filterResult(sortByVotes(state.anecdotes), state.filter)))
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore(state => state.filter)
