import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button.vue', () => {
  it('renders default label when no prop provided', () => {
    const wrapper = mount(Button, {
      props: {
        onClick: vi.fn(),
      },
    })
    expect(wrapper.text()).toContain('REFRESH')
  })

  it('renders custom label when prop provided', () => {
    const label = 'Custom Label'
    const wrapper = mount(Button, {
      props: {
        onClick: vi.fn(),
        label,
      },
    })
    expect(wrapper.text()).toContain(label)
  })

  it('emits click event when clicked', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      props: { onClick },
    })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('stops click event propagation', async () => {
    const parentClick = vi.fn()
    const onClick = vi.fn()
    const wrapper = mount(
      {
        template: '<div @click="parentClick"><Button @click="onClick" /></div>',
        components: { Button },
        methods: { parentClick, onClick },
      },
      {
        global: {
          components: { Button },
        },
      },
    )
    await wrapper.findComponent(Button).trigger('click')
    expect(onClick).toHaveBeenCalled()
    expect(parentClick).not.toHaveBeenCalled()
  })

  it('renders slot content', () => {
    const slotContent = 'Slot Content'
    const wrapper = mount(Button, {
      props: {
        onClick: vi.fn(),
      },
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.text()).toContain(slotContent)
  })
})
