import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const { serverAnecdotes, addVote } = useAnecdotes()

  if (serverAnecdotes.isPending) return (<div>loading...</div>)
  if (serverAnecdotes.isError) return (<div>anecdote service not available due to problems in server</div>)

  const handleVote = (anecdote) => {
    addVote(anecdote)
  }

  const anecdotes = serverAnecdotes.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App