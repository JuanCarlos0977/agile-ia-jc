import './style.css'
import './components/app-header.js'
import './components/fruit-catalog.js'
import { fetchFruits, sortFruitsAlphabetically } from './services/fruit-service.js'

async function initApp() {
  const catalog = document.querySelector('fruit-catalog')
  if (!catalog) return

  try {
    const fruits = await fetchFruits()
    const sortedFruits = sortFruitsAlphabetically(fruits)
    catalog.fruits = sortedFruits
  } catch (error) {
    console.error('Error loading fruits:', error)
  }

  catalog.addEventListener('fruit-selected', (event) => {
    const { id } = event.detail
    window.location.href = `/fruit-detail.html?id=${id}`
  })
}

document.addEventListener('DOMContentLoaded', initApp)
