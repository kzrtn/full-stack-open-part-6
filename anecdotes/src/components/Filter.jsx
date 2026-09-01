import { useFilter, useAnecdotesActions } from '../store'

const Filter = () => {
  const filter = useFilter()
  const { setFilter } = useAnecdotesActions()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input
        onChange={({target}) => setFilter(target.value)}
        value={filter}
      />
    </div>
  )
}

export default Filter