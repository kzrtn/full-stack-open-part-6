import { describe, it, beforeEach, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', {
  getAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn()
})

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdotesActions, useFilter, useNotification, setNotification } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: [],
    filter: '',
  })
  vi.clearAllMocks()
})

describe('useAnecdotesActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [
      {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 0
      }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result:anecdotes } = renderHook(() => useAnecdotes())
    const { result:actions } = renderHook(() => useAnecdotesActions())

    await act(async() => {
      await actions.current.init()
    })
    expect(anecdotes.current).toEqual(mockAnecdotes)
  })

  it('receives anecdotes from the store sorted by votes', async () => {
    const mockAnecdotes = [
      {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 0
      },
      {
        "content": "Adding manpower to a late software project makes it later!",
        "id": "21149",
        "votes": 1
      }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    const { result:anecdotes } = renderHook(() => useAnecdotes())
    const { result:actions } = renderHook(() => useAnecdotesActions())

    await act(async() => {
      await actions.current.init()
    })

    expect(anecdotes.current[0]).toEqual(mockAnecdotes[1])
    expect(anecdotes.current[1]).toEqual(mockAnecdotes[0])
  })

  it('voting increases the number of votes for an anecdote', async () => {
    const mockAnecdotes = [
      {
        content: "If it hurts, do it more often",
        id: "47145",
        votes: 0
      }
    ]
    anecdoteService.update.mockResolvedValue({
      ...mockAnecdotes[0],
      votes: 1
    })

    useAnecdoteStore.setState({
      anecdotes: mockAnecdotes,
      filter: ''
    })

    const { result:anecdotes } = renderHook(() => useAnecdotes())
    const { result:actions } = renderHook(() => useAnecdotesActions())

    await act(async () => {
      await actions.current.vote(mockAnecdotes[0].id)
    })

    expect(anecdotes.current[0].votes).toBe(1)
  })
})