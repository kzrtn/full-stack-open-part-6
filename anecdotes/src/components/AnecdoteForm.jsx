import { setNotification, useAnecdotesActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions()
  const setNotif = setNotification()

  const addAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    add(content)
    setNotif({
      content: `You added '${content}'`,
      type: 'success'
    })
    e.target.reset()
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid='new' name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm