import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAnecdotes
  })

  const addAnecdote = useMutation({
    mutationFn: anecdoteService.postAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  const addVote = useMutation({
    mutationFn: anecdoteService.updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  return {
    serverAnecdotes: result,
    addAnecdote: (content) => addAnecdote.mutate({ content, votes: 0 }),
    addVote: (anecdote) => addVote.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }
}