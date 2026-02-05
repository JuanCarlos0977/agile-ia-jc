import './style.css'
import './components/app-header.js'
import './components/fruit-catalog.js'
import { fetchFruits, sortFruitsAlphabetically, getFruitById } from './services/fruit-service.js'
import { router } from './utils/router.js'

async function renderCatalog() {
  const catalog = document.querySelector('fruit-catalog')
  if (!catalog) return

  try {
    const fruits = await fetchFruits()
    const sortedFruits = sortFruitsAlphabetically(fruits)
    catalog.fruits = sortedFruits
  } catch (error) {
    console.error('Error loading fruits:', error)
  }
}

async function renderDetail(params) {
  const fruitId = params[0]
  if (!fruitId) return
  
  console.log('Navigating to detail for fruit ID:', fruitId)
  
  try {
    const fruit = await getFruitById(fruitId)
    console.log('Fruit data:', fruit)
    
  } catch (error) {
    console.error('Error loading fruit detail:', error)
  }
}

function setupRoutes() {
  router.addRoute('catalog', renderCatalog)
  router.addRoute('detalle', renderDetail)
}

async function initApp() {
  setupRoutes()
  if (!window.location.hash) {
    router.navigate('catalog')
  }
}

document.addEventListener('DOMContentLoaded', initApp)
