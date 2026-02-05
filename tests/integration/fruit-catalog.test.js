import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import '../../src/components/fruit-catalog.js'
import { sortFruitsAlphabetically } from '../../src/services/fruit-service.js'

describe('Fruit Catalog Integration', () => {
  const mockFruits = [
    { id: 1, nombre: 'Naranja', precio: 2.20, imagen: 'https://example.com/naranja.jpg' },
    { id: 2, nombre: 'Manzana', precio: 2.50, imagen: 'https://example.com/manzana.jpg' },
    { id: 3, nombre: 'Aguacate', precio: 3.50, imagen: 'https://example.com/aguacate.jpg' },
    { id: 4, nombre: 'Plátano', precio: 1.80, imagen: 'https://example.com/platano.jpg' }
  ]

  let catalog

  beforeEach(() => {
    document.body.innerHTML = ''
    catalog = document.createElement('fruit-catalog')
    document.body.appendChild(catalog)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should display fruits after loading', () => {
    catalog.fruits = mockFruits
    const cards = catalog.shadowRoot.querySelectorAll('fruit-card')
    expect(cards.length).toBe(4)
  })

  it('should display fruits in alphabetical order when sorted', () => {
    const sortedFruits = sortFruitsAlphabetically(mockFruits)
    catalog.fruits = sortedFruits

    const cards = catalog.shadowRoot.querySelectorAll('fruit-card')
    const names = Array.from(cards).map(card => card.getAttribute('name'))

    expect(names[0]).toBe('Aguacate')
    expect(names[1]).toBe('Manzana')
    expect(names[2]).toBe('Naranja')
    expect(names[3]).toBe('Plátano')
  })

  it('should render fruit cards with correct data', () => {
    catalog.fruits = [mockFruits[1]] // Manzana

    const card = catalog.shadowRoot.querySelector('fruit-card')
    expect(card.getAttribute('name')).toBe('Manzana')
    expect(card.getAttribute('price')).toBe('2.5')
    expect(card.getAttribute('image')).toBe('https://example.com/manzana.jpg')
  })
})
