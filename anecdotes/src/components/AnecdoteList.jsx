import { useAnecdotes } from '../store'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} />
        </div>
      ))}
    </>
  )
}

export default AnecdoteList