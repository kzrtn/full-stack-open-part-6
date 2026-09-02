import { useAnecdotesActions } from '../store'
import { setNotification } from '../store'

const Anecdote = ({anecdote}) => {
  const { vote, remove } = useAnecdotesActions()
  const setNotif = setNotification()

  const voteAnecdote = anecdote => {
    vote(anecdote.id)
    setNotif({
      content: `you voted '${anecdote.content}'`,
      type: 'success'
    })
  }

  const removeAnecdote = anecdote => {
    remove(anecdote.id)
    setNotif({
      content: `You removed '${anecdote.content}'`,
      type: 'success'
    })
  }

  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteAnecdote(anecdote)}>vote</button>
        {!anecdote.votes && (
          <button onClick={() => removeAnecdote(anecdote)}>delete</button>
        )}
      </div>
    </>
  )
}

export default Anecdote