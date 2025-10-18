import Input from '../Input'
import { useEffect, useState } from 'react'
import Subheading from '../Subheading'
import { useAllWordCounts } from '../../../lib/hooks/useAllWordCounts'

interface Counts {
  [letter: string]: number
}

export default function AnagramFinder() {
  const [matchLength, setMatchLength] = useState(true)
  const [letters, setLetters] = useState('')
  const [template, setTemplate] = useState('')
  const [anagrams, setAnagrams] = useState(['🤔'])
  const allWordCounts = useAllWordCounts()

  function countChars(letters: string) {
    const counts: Counts = {}
    for (const letter of letters) {
      if (!counts[letter]) counts[letter] = 1
      else counts[letter]++
    }
    return counts
  }

  function isAnagram(wordCounts: Counts, letterPoolCounts: Counts) {
    for (const letter in wordCounts) {
      if (
        !letterPoolCounts[letter] ||
        wordCounts[letter] > letterPoolCounts[letter]
      )
        return false
    }
    return true
  }

  function isLetter(str: string) {
    return str.length === 1 && str.match(/[a-z]/i)
  }

  function matchesTemplate(word: string) {
    if (matchLength && letters.length !== word.length) {
      return false
    }

    if (template === '')
      // No template = no filtering required!
      return true
    else if (word.length !== template.length) return false

    // Compare the word with the template.
    for (let index = 0; index < word.length; index++) {
      if (!isLetter(template[index]))
        // Treat non-alphabetic characters as wildcards.
        continue
      else if (template[index] !== word[index]) return false
    }

    return true
  }

  useEffect(() => {
    const letterPoolCounts = countChars(letters)
    const computedAnagrams = []

    for (const word in allWordCounts) {
      if (
        isAnagram(allWordCounts[word], letterPoolCounts) &&
        matchesTemplate(word)
      )
        computedAnagrams.push(word)
    }

    /* Populate results! */
    if (computedAnagrams.length === 0) {
      setAnagrams(['🤔'])
    } else {
      setAnagrams(computedAnagrams)
    }
  }, [matchLength, letters, template])

  return (
    <>
      <form>
        <label className="mb-3 block">
          <input
            type="checkbox"
            checked={matchLength}
            onChange={(e) => setMatchLength(e.target.checked)}
            className="me-2 rounded-sm"
          />
          Match Length
        </label>

        <label className="mb-3 block">
          Letter Pool
          <Input
            type="text"
            value={letters}
            onChange={(e) => setLetters(e.target.value)}
            placeholder="ex: steak"
            className="w-1/2 md:w-1/4"
          />
        </label>

        <label className="mb-3 block">
          Template
          <Input
            type="text"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            placeholder="ex: s_a_e"
            className="w-1/2 md:w-1/4"
          />
        </label>

        <Subheading className="mt-5">Possible Anagrams</Subheading>
        <ul className="list-inside list-disc">
          {anagrams.map((anagram) => (
            <li key={anagram}>{anagram}</li>
          ))}
        </ul>
      </form>
    </>
  )
}
