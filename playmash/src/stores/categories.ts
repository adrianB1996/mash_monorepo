import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Category = {
  title: string
  options: CategoryOption[]
}

export function categoryComplete(category: Category): boolean {
  return category.options.every((option) => option.state !== 'waiting')
}

export function allCategoriesComplete(categories: Category[]): boolean {
  return categories.every((category) => categoryComplete(category))
}

export type CategoryOption = {
  title: string
  state: 'waiting' | 'chosen' | 'discarded'
}

export const defaultCategories: { [key: string]: Category[] } = {
  Traditional: [
    {
      title: 'Marry',
      options: [
        { title: 'Robin', state: 'waiting' },
        { title: 'Sammie', state: 'waiting' },
        { title: 'Kris', state: 'waiting' },
        { title: 'Jessie', state: 'waiting' },
      ],
    },
    {
      title: 'Kids',
      options: [
        { title: '1', state: 'waiting' },
        { title: '2', state: 'waiting' },
        { title: '3', state: 'waiting' },
        { title: '8', state: 'waiting' },
      ],
    },
    {
      title: 'Job',
      options: [
        { title: 'Doctor', state: 'waiting' },
        { title: 'Artist', state: 'waiting' },
        { title: 'Politician', state: 'waiting' },
        { title: 'Spy', state: 'waiting' },
      ],
    },
    {
      title: 'Living Arrangement',
      options: [
        { title: 'Mansion', state: 'waiting' },
        { title: 'Apartment', state: 'waiting' },
        { title: 'Shack', state: 'waiting' },
        { title: 'House', state: 'waiting' },
      ],
    },
  ],
  'Software Engineer': [
    {
      title: 'Job',
      options: [
        { title: 'Developer', state: 'waiting' },
        { title: 'Designer', state: 'waiting' },
        { title: 'Manager', state: 'waiting' },
        { title: 'Architect', state: 'waiting' },
      ],
    },
    {
      title: 'Hobby',
      options: [
        { title: 'Nature', state: 'waiting' },
        { title: 'Gaming', state: 'waiting' },
        { title: 'Photography', state: 'waiting' },
        { title: 'Open-source', state: 'waiting' },
      ],
    },
    {
      title: 'Salary',
      options: [
        { title: '$15,000', state: 'waiting' },
        { title: '$50,000', state: 'waiting' },
        { title: '$100,000', state: 'waiting' },
        { title: '$1,000,000', state: 'waiting' },
      ],
    },
    {
      title: 'State of production',
      options: [
        { title: 'On fire daily', state: 'waiting' },
        { title: 'Pretty stable', state: 'waiting' },
        { title: 'House of cards', state: 'waiting' },
        { title: 'Twelve nines', state: 'waiting' },
      ],
    },
  ],
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])

  function addCategory(category: Category) {
    categories.value.push(category)
    return category
  }

  function removeCategory(category: Category) {
    const index = categories.value.indexOf(category)
    if (index !== -1) {
      categories.value.splice(index, 1)
    }
  }

  function addOptionToCategory(category: Category, option: CategoryOption) {
    category.options.push(option)
  }

  function removeOptionFromCategory(category: Category, index: number) {
    if (index !== -1) {
      category.options.splice(index, 1)
    }
    if (category.options.length === 0) {
      addOptionToCategory(category, { title: '', state: 'waiting' })
    }
  }

  function useDefault(category: string) {
    if (defaultCategories[category]) {
      categories.value = JSON.parse(JSON.stringify(defaultCategories[category])) // Deep copy
    } else {
      categories.value = []
    }
  }

  return {
    categories,
    useDefault,
    addCategory,
    removeCategory,
    addOptionToCategory,
    removeOptionFromCategory,
  }
})
