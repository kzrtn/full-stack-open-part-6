import { useEffect } from 'react'
import { useAnecdotesActions } from './store'
import Filter from './components/Filter'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { init } = useAnecdotesActions()
  useEffect(() => {
    init()
  }, [init])

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
