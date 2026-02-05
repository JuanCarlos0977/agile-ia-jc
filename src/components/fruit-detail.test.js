import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { FruitDetail } from './fruit-detail.js'

describe('FruitDetail', () => {
  let element

  beforeEach(() => {
    element = new FruitDetail()
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  it('should render loading state when fruit-id is provided but no fruit data', () => {
    element.setAttribute('fruit-id', '1')
    element.render()

    const loadingElement = element.shadowRoot.querySelector('.loading')
    expect(loadingElement).toBeTruthy()
    expect(loadingElement.textContent).toBe('Cargando detalles de la fruta...')
  })

  it('should render error state when no fruit data', () => {
    element.render()

    const errorElement = element.shadowRoot.querySelector('.error')
    expect(errorElement).toBeTruthy()
    expect(errorElement.textContent).toBe('No se encontró la fruta')
  })

  it('should render fruit details when fruit data is provided', () => {
    const mockFruit = {
      nombre: 'Manzana',
      precio: 2.50,
      imagen: 'https://example.com/apple.jpg'
    }
    
    element.fruit = mockFruit
    element.render()

    const nameElement = element.shadowRoot.querySelector('.detail-name')
    const priceElement = element.shadowRoot.querySelector('.detail-price')
    const imageElement = element.shadowRoot.querySelector('.detail-image')

    expect(nameElement.textContent).toBe('Manzana')
    expect(priceElement.textContent).toBe('2.50 €/kg')
    expect(imageElement.src).toBe('https://example.com/apple.jpg')
    expect(imageElement.alt).toBe('Manzana')
  })

  it('should format price correctly', () => {
    const mockFruit = {
      nombre: 'Banana',
      precio: '1.5',
      imagen: 'https://example.com/banana.jpg'
    }
    
    element.fruit = mockFruit
    element.render()

    const priceElement = element.shadowRoot.querySelector('.detail-price')
    expect(priceElement.textContent).toBe('1.50 €/kg')
  })

  it('should dispatch back-to-catalog event when back button is clicked', () => {
    const mockFruit = {
      nombre: 'Naranja',
      precio: 3.00,
      imagen: 'https://example.com/orange.jpg'
    }
    
    element.fruit = mockFruit
    element.render()

    const backButton = element.shadowRoot.querySelector('.back-button')
    const spy = vi.fn()
    element.addEventListener('back-to-catalog', spy)

    backButton.click()

    expect(spy).toHaveBeenCalled()
  })

  it('should use fallback image when image fails to load', () => {
    const mockFruit = {
      nombre: 'Pera',
      precio: 2.00,
      imagen: 'https://invalid-url.com/pear.jpg'
    }
    
    element.fruit = mockFruit
    element.render()

    const imageElement = element.shadowRoot.querySelector('.detail-image')
    expect(imageElement.getAttribute('onerror')).toBeTruthy()
  })
})