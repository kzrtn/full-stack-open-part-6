import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import useNotification from './useNotification'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAnecdotes,
    refetchOnWindowFocus: false
  })

  const addAnecdote = useMutation({
    mutationFn: anecdoteService.postAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`Added anecdote '${content}'`, 'success')
    },
    onError: () => setNotification('too short anecdote, must have length 5 or more', 'error')
  })

  const addVote = useMutation({
    mutationFn: anecdoteService.updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a =>
        updatedAnecdote.id === a.id ? updatedAnecdote : a
      ))
    }
  })

  return {
    serverAnecdotes: result,
    addAnecdote: (newAnecdote) => addAnecdote.mutate(newAnecdote),
    addVote: (anecdote) => addVote.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }
}