import { describe, it, expect, beforeEach } from 'vitest'
import './app-header.js'

describe('AppHeader Component', () => {
  let element

  beforeEach(() => {
    // Limpiar DOM antes de cada test
    document.body.innerHTML = ''
    
    // Crear elemento del componente
    element = document.createElement('app-header')
    document.body.appendChild(element)
  })

  it('should render the header element', () => {
    const header = element.shadowRoot.querySelector('header')
    expect(header).toBeTruthy()
  })

  it('should display the correct title', () => {
    const title = element.shadowRoot.querySelector('h1')
    expect(title).toBeTruthy()
    expect(title.textContent).toBe('Frutería')
  })

  it('should have the correct styling', () => {
    const header = element.shadowRoot.querySelector('header')
    const style = element.shadowRoot.querySelector('style')
    
    expect(header).toBeTruthy()
    expect(style).toBeTruthy()
    expect(style.textContent).toContain('#4CAF50') // Color verde
  })

  it('should be a custom element', () => {
    expect(element.tagName.toLowerCase()).toBe('app-header')
    expect(element.shadowRoot).toBeTruthy()
  })
})