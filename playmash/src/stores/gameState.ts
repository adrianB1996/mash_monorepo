import { ref } from 'vue'
import { defineStore } from 'pinia'
import { allCategoriesComplete, useCategoriesStore } from './categories'

export type step = 'finished' | 'strike' | 'step'

export const useGameStateStore = defineStore('gameState', () => {
  const categories = useCategoriesStore()
  const pointer = ref([0, 0])
  const mashNumber = ref(-1)
  const currentCount = ref(0)

  function setMashNumber(num: number) {
    mashNumber.value = num
    currentCount.value = 0
  }

  function next(): step {
    if (allCategoriesComplete(categories.categories)) {
      pointer.value = [-1, -1]
      return 'finished'
    }

    let [row, col] = pointer.value

    while (true) {
      // Move to the next element in the current row
      if (col < categories.categories[row].options.length - 1) {
        col++
      } else {
        // Move to the start of the next row, or wrap around to the first row
        row = (row + 1) % categories.categories.length
        col = 0
      }
      if (categories.categories[row].options[col].state === 'waiting') {
        break
      }
    }

    pointer.value = [row, col]
    document
      .getElementById(`option-${row}-${col}`)
      ?.scrollIntoView({ behavior: 'auto', block: 'center' })
    currentCount.value++

    if (currentCount.value === mashNumber.value) {
      currentCount.value = 0

      categories.categories[row].options[col].state = 'discarded'

      const notDiscarded = categories.categories[row].options.filter(
        (option) => option.state !== 'discarded',
      )

      if (notDiscarded.length === 1) {
        notDiscarded[0].state = 'chosen'
      }
      return 'strike'
    }
    return 'step'
  }

  function reset() {
    pointer.value = [0, 0]
    mashNumber.value = -1
    currentCount.value = 0
    for (const category of categories.categories) {
      for (const option of category.options) {
        option.state = 'waiting'
      }
    }
  }

  return {
    categories,
    pointer,
    next,
    setMashNumber,
    mashNumber,
    currentCount,
    reset,
  }
})
