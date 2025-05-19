import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MashNumber from '../MashNumber.vue'

describe('CategoryItem', () => {
  it('shows mash number when count is zero', () => {
    const wrapper = mount(MashNumber, {
      props: { currentCount: 0, mashNumber: 10 },
    })
    expect(wrapper.find('span').text()).toContain('10')
  })

  it('shows current number when count is not zero', () => {
    const wrapper = mount(MashNumber, {
      props: { currentCount: 1, mashNumber: 10 },
    })
    expect(wrapper.find('span').text()).toContain('1')
  })
})
