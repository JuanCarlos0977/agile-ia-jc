import { describe, it, expect, beforeEach, vi } from 'vitest'
import './fruit-card.js'

describe('FruitCard Component', () => {
  let element

  beforeEach(() => {
    document.body.innerHTML = ''
    element = document.createElement('fruit-card')
    element.setAttribute('id', '1')
    element.setAttribute('name', 'Manzana')
    element.setAttribute('price', '2.50')
    element.setAttribute('image', 'https://example.com/manzana.jpg')
    document.body.appendChild(element)
  })

  it('should render the card element', () => {
    const card = element.shadowRoot.querySelector('.card')
    expect(card).toBeTruthy()
  })

  it('should display the fruit name correctly', () => {
    const name = element.shadowRoot.querySelector('.name')
    expect(name).toBeTruthy()
    expect(name.textContent).toBe('Manzana')
  })

  it('should display the price with euro/kg unit', () => {
    const price = element.shadowRoot.querySelector('.price')
    expect(price).toBeTruthy()
    expect(price.textContent).toContain('2.50')
    expect(price.textContent).toContain('\u20AC/kg')
  })

  it('should format price with 2 decimals', () => {
    element.setAttribute('price', '3')
    const price = element.shadowRoot.querySelector('.price')
    expect(price.textContent).toContain('3.00')
  })

  it('should format price with 2 decimals when has more decimals', () => {
    element.setAttribute('price', '2.567')
    const price = element.shadowRoot.querySelector('.price')
    expect(price.textContent).toContain('2.57')
  })

  it('should have image element configured', () => {
    const img = element.shadowRoot.querySelector('.card-image')
    expect(img).toBeTruthy()
    expect(img.getAttribute('src')).toBe('https://example.com/manzana.jpg')
  })

  it('should have onerror handler for fallback image', () => {
    const img = element.shadowRoot.querySelector('.card-image')
    expect(img.getAttribute('onerror')).toContain('this.src=')
  })

  it('should have price in green color', () => {
    const style = element.shadowRoot.querySelector('style')
    expect(style.textContent).toContain('#4CAF50')
  })

  it('should be a custom element with shadow DOM', () => {
    expect(element.tagName.toLowerCase()).toBe('fruit-card')
    expect(element.shadowRoot).toBeTruthy()
  })

  it('should position name in top-left corner', () => {
    const style = element.shadowRoot.querySelector('style')
    expect(style.textContent).toContain('.name')
    expect(style.textContent).toContain('top:')
    expect(style.textContent).toContain('left:')
  })

  it('should position price in bottom-right corner', () => {
    const style = element.shadowRoot.querySelector('style')
    expect(style.textContent).toContain('.price')
    expect(style.textContent).toContain('bottom:')
    expect(style.textContent).toContain('right:')
  })

  it('should have square dimensions', () => {
    const style = element.shadowRoot.querySelector('style')
    expect(style.textContent).toContain('width: 200px')
    expect(style.textContent).toContain('height: 200px')
  })

  it('should have cursor pointer style', () => {
    const style = element.shadowRoot.querySelector('style')
    expect(style.textContent).toContain('cursor: pointer')
  })

  it('should have hover effect', () => {
    const style = element.shadowRoot.querySelector('style')
    expect(style.textContent).toContain('.card:hover')
    expect(style.textContent).toContain('transform: translateY(-4px)')
  })

  it('should dispatch fruit-selected event when card is clicked', () => {
    const spy = vi.fn()
    element.addEventListener('fruit-selected', spy)
    
    const card = element.shadowRoot.querySelector('.card')
    card.click()
    
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { id: '1', name: 'Manzana' }
      })
    )
  })

  it('should observe id attribute', () => {
    expect(element.constructor.observedAttributes).toContain('id')
  })
})
