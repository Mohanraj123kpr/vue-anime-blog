import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CardComponent from '@/components/ContentCard.vue'

describe('CardComponent.vue', () => {
  const defaultProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    thumbnail: 'https://i.pinimg.com/736x/51/a4/bd/51a4bd7a1df81792b78c04635754d153.jpg',
    logo: 'https://i0.wp.com/www.kearipan.com/wp-content/uploads/2022/07/black-clover-anime.jpg',
  }

  it('renders title, subtitle, and images correctly', () => {
    const wrapper = mount(CardComponent, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain(defaultProps.title)
    expect(wrapper.text()).toContain(defaultProps.subtitle)

    const images = wrapper.findAll('img')
    // Should contain both thumbnail and logo image
    expect(images.length).toBeGreaterThanOrEqual(2)
    expect(wrapper.html()).toContain(defaultProps.thumbnail)
    expect(wrapper.html()).toContain(defaultProps.logo)
  })

  it('emits click event or calls onCardClick when clicked', async () => {
    const onCardClick = vi.fn()
    const wrapper = mount(CardComponent, {
      props: {
        ...defaultProps,
        onCardClick,
      },
    })

    await wrapper.trigger('click')
    expect(onCardClick).toHaveBeenCalled()
  })

  it('renders action slot content if provided', () => {
    const wrapper = mount(CardComponent, {
      props: defaultProps,
      slots: {
        action: '<button class="test-action-btn">Action Button</button>',
      },
    })

    const actionBtn = wrapper.find('.test-action-btn')
    expect(actionBtn.exists()).toBe(true)
    expect(actionBtn.text()).toBe('Action Button')
  })
})
