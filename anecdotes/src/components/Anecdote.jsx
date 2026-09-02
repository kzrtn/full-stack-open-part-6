import { useAnecdotesActions } from '../store'
import { setNotification } from '../store'

const Anecdote = ({anecdote}) => {
  const { vote, remove } = useAnecdotesActions()
  const setNotif = setNotification()

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
        <button onClick={() => vote(anecdote.id)}>vote</button>
        {!anecdote.votes && (
          <button onClick={() => removeAnecdote(anecdote)}>remove</button>
        )}
      </div>
    </>
  )
}

export default Anecdote