import { create } from 'zustand'

const calculateDisplay = ({ good, neutral, bad, all, average, positive }) => {
  all = good + neutral + bad
  average = (good - bad) / all
  positive = (good / all) * 100
  return { good, neutral, bad, all, average, positive }
}

const useCounterStore = create(set => ({
  display: {
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
  },
  actions: {
    addGood: () => set(state => ({ display: calculateDisplay({ ...state.display, good: state.display.good + 1 })})),
    addNeutral: () => set(state => ({ display: calculateDisplay({ ...state.display, neutral: state.display.neutral + 1 })})),
    addBad: () => set(state => ({ display: calculateDisplay({ ...state.display, neutral: state.display.bad + 1 })}))
  }
}))

export const useCounterDisplay = () => useCounterStore(state => state.display)
export const useCounterControl = () => useCounterStore(state => state.actions)