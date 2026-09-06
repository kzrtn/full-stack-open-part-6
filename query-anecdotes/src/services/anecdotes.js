const baseUrl = 'http://127.0.0.1:3001/anecdotes'

const getAnecdotes = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) throw new Error('Failed to fetch anecdotes')
  return await res.json()
}

const postAnecdote = async (anecdote) => {
  const options = {
    method: "POST",
    body: JSON.stringify(anecdote),
    headers: { "Content-Type": "application/json" }
  }

  const res = await fetch(baseUrl, options)
  if (!res.ok) throw new Error('Failed to post anecdote')
  return await res.json()
}

const updateAnecdote = async (anecdote) => {
  const options = {
    method: "PUT",
    body: JSON.stringify(anecdote),
    headers: { "Content-Type": "application/json" }
  }
  const res = await fetch(`${baseUrl}/${anecdote.id}`, options)
  if (!res.ok) throw new Error('Failed to update anecdote')
  return await res.json()
}

export default {
  getAnecdotes,
  postAnecdote,
  updateAnecdote
}