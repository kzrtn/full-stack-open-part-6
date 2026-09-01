const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) throw new Error(`Response status: ${res.status}`)
  return await res.json()
}

const create = async (content) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content, votes: 0 })
  })
  if(!res.ok) throw new Error(`Response status: ${res.status}`)
  return await res.json()
}

export default { getAll, create }