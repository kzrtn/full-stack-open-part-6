import { useShallow } from 'zustand/react/shallow'
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'
import anecdotes from './services/anecdotes'

const sortByVotes = (arr) => arr.toSorted((a, b) => b.votes - a.votes)
const filterResult = (arr, filter) => arr.filter(
  a => filter
  ? a.content.toUpperCase().includes(filter.toUpperCase())
  : true
)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async id => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({
        anecdotes: (state.anecdotes.map(a => a.id === id ? updated : a))
      }))
    },
    add: async content => {
      const anecdote = await anecdoteService.create(content)
      set(state => ({ anecdotes: [...state.anecdotes, anecdote]}))
    },
    setFilter: value => set(() => ({ filter: value })),
    init: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(()=> ({ anecdotes }))
    },
    remove: async id => {
      await anecdoteService.remove(id)
      set(state => ({ anecdotes: (state.anecdotes.filter(a => a.id !== id)) }))
    }
  }
}))

const useNotificationStore = create((set) => ({
  notification: {
    content: '',
    type: ''
  },
  setNotification: value => {
    set(() => ({ notification: value }))
    setTimeout(() => set(() => ({ notification: { content: '', type: '' } })), 3000)
  }
}))

export const useAnecdotes = () => useAnecdoteStore(useShallow((state) => filterResult(sortByVotes(state.anecdotes), state.filter)))
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useNotification = () => useNotificationStore(state => state.notification)
export const setNotification = () => useNotificationStore(state => state.setNotification)