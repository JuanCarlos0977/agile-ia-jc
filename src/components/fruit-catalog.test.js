import { describe, it, expect, beforeEach } from 'vitest'
import './fruit-catalog.js'

describe('FruitCatalog Component', () => {
  let element
  const mockFruits = [
    { id: 1, nombre: 'Manzana', precio: 2.50, imagen: 'https://example.com/manzana.jpg' },
    { id: 2, nombre: 'Plátano', precio: 1.80, imagen: 'https://example.com/platano.jpg' },
    { id: 3, nombre: 'Naranja', precio: 2.20, imagen: 'https://example.com/naranja.jpg' }
  ]

  beforeEach(() => {
    document.body.innerHTML = ''
    element = document.createElement('fruit-catalog')
    document.body.appendChild(element)
  })

  it('should render the catalog container', () => {
    const catalog = element.shadowRoot.querySelector('.catalog')
    expect(catalog).toBeTruthy()
  })

  it('should render multiple fruit cards when fruits are set', () => {
    element.fruits = mockFruits
    const cards = element.shadowRoot.querySelectorAll('fruit-card')
    expect(cards.length).toBe(3)
  })

  it('should pass correct attributes to fruit cards', () => {
    element.fruits = mockFruits
    const firstCard = element.shadowRoot.querySelector('fruit-card')
    expect(firstCard.getAttribute('name')).toBe('Manzana')
    expect(firstCard.getAttribute('price')).toBe('2.5')
    expect(firstCard.getAttribute('image')).toBe('https://example.com/manzana.jpg')
  })

  it('should use CSS grid for layout', () => {
    const style = element.shadowRoot.querySelector('style')
    expect(style.textContent).toContain('display: grid')
    expect(style.textContent).toContain('grid-template-columns')
  })

  it('should be a custom element with shadow DOM', () => {
    expect(element.tagName.toLowerCase()).toBe('fruit-catalog')
    expect(element.shadowRoot).toBeTruthy()
  })

  it('should render empty catalog when no fruits', () => {
    element.fruits = []
    const cards = element.shadowRoot.querySelectorAll('fruit-card')
    expect(cards.length).toBe(0)
  })

  it('should update when fruits property changes', () => {
    element.fruits = [mockFruits[0]]
    let cards = element.shadowRoot.querySelectorAll('fruit-card')
    expect(cards.length).toBe(1)

    element.fruits = mockFruits
    cards = element.shadowRoot.querySelectorAll('fruit-card')
    expect(cards.length).toBe(3)
  })
})
