import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useGameStateStore } from '../gameState'
import type { Category } from '../categories'

describe.each([
  {
    mashNumber: 2,
    initial: [
      {
        title: 'Test 0',
        options: [
          { title: 'Test 0 0', state: 'waiting' },
          { title: 'Test 0 1', state: 'waiting' },
          { title: 'Test 0 2', state: 'waiting' },
        ],
      },
      {
        title: 'Test 1',
        options: [
          { title: 'Test 1 0', state: 'waiting' },
          { title: 'Test 1 1', state: 'waiting' },
          { title: 'Test 1 2', state: 'waiting' },
        ],
      },
    ],
    expected: [
      {
        title: 'Test 0',
        options: [
          { title: 'Test 0 0', state: 'discarded' },
          { title: 'Test 0 1', state: 'chosen' },
          { title: 'Test 0 2', state: 'discarded' },
        ],
      },
      {
        title: 'Test 1',
        options: [
          { title: 'Test 1 0', state: 'chosen' },
          { title: 'Test 1 1', state: 'discarded' },
          { title: 'Test 1 2', state: 'discarded' },
        ],
      },
    ],
  },
  {
    mashNumber: 6,
    initial: [
      {
        title: 'Test 0',
        options: [
          { title: 'Test 0 0', state: 'waiting' },
          { title: 'Test 0 1', state: 'waiting' },
          { title: 'Test 0 2', state: 'waiting' },
          { title: 'Test 0 3', state: 'waiting' },
          { title: 'Test 0 4', state: 'waiting' },
        ],
      },
      {
        title: 'Test 1',
        options: [
          { title: 'Test 1 0', state: 'waiting' },
          { title: 'Test 1 1', state: 'waiting' },
          { title: 'Test 1 2', state: 'waiting' },
        ],
      },
    ],
    expected: [
      {
        title: 'Test 0',
        options: [
          { title: 'Test 0 0', state: 'chosen' },
          { title: 'Test 0 1', state: 'discarded' },
          { title: 'Test 0 2', state: 'discarded' },
          { title: 'Test 0 3', state: 'discarded' },
          { title: 'Test 0 4', state: 'discarded' },
        ],
      },
      {
        title: 'Test 1',
        options: [
          { title: 'Test 1 0', state: 'discarded' },
          { title: 'Test 1 1', state: 'discarded' },
          { title: 'Test 1 2', state: 'chosen' },
        ],
      },
    ],
  },
])("gameState's next method", ({ mashNumber, initial, expected }) => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('correctly progresses the game state', () => {
    const gameState = useGameStateStore()
    gameState.setMashNumber(mashNumber)

    gameState.categories.categories = initial as Category[]

    let state = ''

    while (state !== 'finished') {
      state = gameState.next()
    }

    expect(gameState.categories.categories).toEqual(expected)
  })
})
