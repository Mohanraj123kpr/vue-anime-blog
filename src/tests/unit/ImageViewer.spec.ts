import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ImageViewer from '@/components/ImageViewer.vue'

describe('ImageViewer.vue', () => {
  const defaultProps = {
    src: 'https://i.pinimg.com/736x/51/a4/bd/51a4bd7a1df81792b78c04635754d153.jpg',
    alt: 'Test image',
    customClass: 'h-20 w-20',
  }

  it('renders an image with given props', () => {
    const wrapper = mount(ImageViewer, {
      props: defaultProps,
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(defaultProps.src)
    expect(img.attributes('alt')).toBe(defaultProps.alt)
    expect(img.classes()).toContain('h-20')
    expect(img.classes()).toContain('w-20')
  })

  it('uses lazy loading if "lazy" prop is true', () => {
    const wrapper = mount(ImageViewer, {
      props: {
        ...defaultProps,
        lazy: true,
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('loading')).toBe('lazy')
  })

  it('uses eager loading by default', () => {
    const wrapper = mount(ImageViewer, {
      props: defaultProps,
    })

    const img = wrapper.find('img')
    expect(img.attributes('loading')).toBe('eager')
  })

  it('renders fallback image if original fails to load', async () => {
    const fallbackSrc =
      'https://i0.wp.com/www.kearipan.com/wp-content/uploads/2022/07/black-clover-anime.jpg'
    const wrapper = mount(ImageViewer, {
      props: {
        ...defaultProps,
        fallbackSrc,
      },
    })

    // Simulate error
    await wrapper.find('img').trigger('error')

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(fallbackSrc)
  })
})
