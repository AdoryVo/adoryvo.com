import { useEffect, useState } from 'react'

interface AllWordCounts {
  [word: string]: {
    [letter: string]: number
  }
}

export function useAllWordCounts() {
  const [allWordCounts, setAllWordCounts] = useState<AllWordCounts | null>(null)

  useEffect(() => {
    fetch('/data/counted-corncob-word-list.json')
      .then((response) => response.json())
      .then((fetchedWordCounts) => {
        setAllWordCounts(fetchedWordCounts)
      })
  }, [])

  return allWordCounts
}
