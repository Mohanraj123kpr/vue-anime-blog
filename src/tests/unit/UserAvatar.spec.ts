import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserAvatarCard from '@/components/UserAvatar.vue'

// Mock @vueuse/core composable
vi.mock('@vueuse/core', async () => {
  const actual = await vi.importActual<any>('@vueuse/core')
  return {
    ...actual,
    onClickOutside: vi.fn(),
  }
})

describe('UserAvatarCard.vue', () => {
  const userName = 'Pawan Kumar'
  const userAction = 'Logout'

  let wrapper: any

  beforeEach(() => {
    wrapper = mount(UserAvatarCard, {
      props: {
        userName,
        userAction,
      },
    })
  })

  it('renders user initials from full name', () => {
    expect(wrapper.text()).toContain('PK')
  })

  it('shows and hides dropdown on avatar click', async () => {
    expect(wrapper.find('.absolute').exists()).toBe(false)

    await wrapper.find('.cursor-pointer').trigger('click')
    expect(wrapper.find('.absolute').exists()).toBe(true)

    await wrapper.find('.cursor-pointer').trigger('click')
    expect(wrapper.find('.absolute').exists()).toBe(false)
  })

  it('shows full user name in dropdown', async () => {
    await wrapper.find('.cursor-pointer').trigger('click')
    expect(wrapper.html()).toContain(userName)
  })

  it('emits userActionClick event and closes dropdown', async () => {
    await wrapper.find('.cursor-pointer').trigger('click') // open
    const actionButton = wrapper.find('button')
    await actionButton.trigger('click')

    expect(wrapper.emitted('userActionClick')).toBeTruthy()
    expect(wrapper.find('.absolute').exists()).toBe(false)
  })
})
