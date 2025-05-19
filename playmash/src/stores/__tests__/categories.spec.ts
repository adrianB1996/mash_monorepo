import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useCategoriesStore } from '../categories'

describe('categories', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can add categories', () => {
    const categories = useCategoriesStore()

    categories.addCategory({ title: 'New category', options: [] })

    expect(categories.categories.length).toBe(1)
  })

  it('can remove categories', () => {
    const categories = useCategoriesStore()

    categories.categories = [{ title: 'New category', options: [] }]

    expect(categories.categories.length).toBe(1)

    categories.removeCategory({ title: 'New category', options: [] })
  })

  it('doesnt leave category empty when deleting last option', () => {
    const categories = useCategoriesStore()

    categories.categories = [{ title: 'New category', options: [{ title: '', state: 'waiting' }] }]

    expect(categories.categories.length).toBe(1)

    categories.removeCategory({ title: 'New category', options: [{ title: '', state: 'waiting' }] })

    expect(categories.categories.length).not.toBe(0)
    expect(categories.categories.at(0)?.options).toEqual([{ title: '', state: 'waiting' }])
  })
})
