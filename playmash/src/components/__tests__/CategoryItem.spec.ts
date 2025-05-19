import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CategoryItem from '../CategoryItem.vue'

describe('CategoryItem', () => {
  it('renders properly', () => {
    const wrapper = mount(CategoryItem, {
      props: { title: 'Job', options: [], group: 0, pointer: 0, editable: false },
    })
    expect(wrapper.find('[name="title"]').attributes('value')).toContain('Job')
  })

  it('renders options', () => {
    const wrapper = mount(CategoryItem, {
      props: {
        title: 'Job',
        options: [
          { title: 'Test', state: 'waiting' },
          { title: 'Test2', state: 'waiting' },
        ],
        group: 0,
        pointer: 0,
        editable: false,
      },
    })
    expect(wrapper.findAll('[name="option"]')).toHaveLength(2)
  })

  it('shows pointer in correct place', () => {
    const wrapper = mount(CategoryItem, {
      props: {
        title: 'Job',
        options: [
          { title: 'Test', state: 'waiting' },
          { title: 'Test2', state: 'waiting' },
        ],
        group: 0,
        pointer: 1,
        editable: false,
      },
    })

    const pointers = wrapper.findAll('[name="pointer"]')

    expect(pointers.at(0)?.classes()).toContain('invisible')
    expect(pointers.at(1)?.classes()).not.toContain('invisible')
  })
})
