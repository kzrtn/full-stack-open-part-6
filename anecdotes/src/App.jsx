import { useEffect } from 'react'
import { useAnecdotesActions } from './store'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {
  const { init } = useAnecdotesActions()
  useEffect(() => {
    init()
  }, [init])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
