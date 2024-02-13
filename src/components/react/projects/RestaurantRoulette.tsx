import { useState } from 'react'
import Subheading from '../Subheading'
import Button from '../Button'
import Input from '../Input'
import { Plus, Dices, X } from 'lucide-react'

export default function RestaurantRoulette() {
  const [ocean, setOcean] = useState([
    'Korean',
    'Chinese',
    'Mexican',
    'Ramen',
    'Sushi',
    'Mediterranean',
    'Wildcard',
    'American',
  ])
  const [customChoice, setCustomChoice] = useState('')
  const [pool, setPool] = useState<string[]>([])
  const [choice, setChoice] = useState('')

  function addToOcean(restaurant: string) {
    if (restaurant.length > 0) {
      setOcean([...ocean, restaurant])
      setCustomChoice('')
    }
  }

  function addToPool(restaurant: string) {
    setPool([...pool, restaurant])
  }

  function removeFromPool(index: number) {
    setPool(pool.toSpliced(index, 1))
  }

  function randomItem(array: string[]) {
    return array[Math.floor(Math.random() * array.length)]
  }

  function rollChoice() {
    const ROLL_ITERATIONS = 10
    const TIME_BETWEEN_ROLLS = 50

    // Flash a bunch of options
    for (let iteration = 0; iteration < ROLL_ITERATIONS; iteration++) {
      setTimeout(
        () => setChoice(randomItem(pool)),
        iteration * TIME_BETWEEN_ROLLS
      )
    }
  }

  return (
    <>
      {/* Current restaurant pool */}
      <details className="mb-4" open>
        <summary className="italic">Restaurants to add from</summary>
        <ul className="list-inside list-decimal">
          {ocean.map((restaurant, index) => (
            <li key={index}>
              {restaurant}
              <button
                className="ms-2"
                type="button"
                title="Add to pool"
                onClick={() => addToPool(restaurant)}
              >
                <Plus className="inline w-4 align-top text-green-400" />
              </button>
            </li>
          ))}
        </ul>
        <div>
          <Input
            placeholder="Enter custom choice"
            value={customChoice}
            onChange={(e) => setCustomChoice(e.target.value)}
            className="me-2 inline-block w-1/2 md:w-1/4"
          />
          <Button
            className="bg-green-600 font-bold transition-colors hover:bg-green-700"
            onClick={() => addToOcean(customChoice)}
          >
            <Plus className="me-1 inline align-top" />
            Add
          </Button>
        </div>
      </details>

      {/* Restaurants open now */}
      <Subheading>Current restaurant pool</Subheading>
      {!pool.length && <span>- Add some restaurants from the list above</span>}
      <ul className="mb-8 list-inside list-disc text-sm sm:text-base">
        {pool.map((restaurant, index) => (
          <li key={index}>
            {restaurant}
            <button
              className="ms-2"
              type="button"
              title="Remove from pool"
              onClick={() => removeFromPool(index)}
            >
              <X className="inline w-4 align-top text-red-400" />
            </button>
          </li>
        ))}
      </ul>

      {/* Roll button */}
      <h6 className="mb-3 text-lg font-semibold">
        Choice:{' '}
        <span id="result" className="text-red-200">
          {choice || 'Take a roll!'}
        </span>
      </h6>
      <button
        onClick={rollChoice}
        className="rounded bg-blue-500 px-4 py-2 font-bold transition-colors hover:bg-blue-700"
      >
        <Dices className="me-2 inline align-top" />
        Roll!
      </button>
    </>
  )
}
