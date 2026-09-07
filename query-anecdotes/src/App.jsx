import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import useNotification from './hooks/useNotification'

const App = () => {
  const { serverAnecdotes, addVote } = useAnecdotes()
  const { setNotification } = useNotification()

  if (serverAnecdotes.isPending) return (<div>loading...</div>)
  if (serverAnecdotes.isError) return (<div>anecdote service not available due to problems in server</div>)

  const handleVote = (anecdote) => {
    addVote(anecdote)
    setNotification(`anecdote '${anecdote.content}' voted`)
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