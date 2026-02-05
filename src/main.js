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
    
    catalog.addEventListener('fruit-selected', handleFruitSelection)
  } catch (error) {
    console.error('Error loading fruits:', error)
  }
}

function handleFruitSelection(event) {
  const { fruitId, name } = event.detail
  console.log(`Fruit selected: ${name} (ID: ${fruitId})`)
  
}

document.addEventListener('DOMContentLoaded', initApp)
