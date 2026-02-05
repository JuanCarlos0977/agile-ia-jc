import './style.css'
import './components/app-header.js'
import './components/fruit-detail.js'
import { fetchFruitById } from './services/fruit-service.js'

async function initDetailPage() {
  const detailComponent = document.querySelector('#fruit-detail-component')
  if (!detailComponent) return

  const urlParams = new URLSearchParams(window.location.search)
  const fruitId = urlParams.get('id')

  if (!fruitId) {
    console.error('No fruit ID provided')
    return
  }

  try {
    const fruit = await fetchFruitById(fruitId)
    detailComponent.fruit = fruit
  } catch (error) {
    console.error('Error loading fruit details:', error)
  }

  detailComponent.addEventListener('back-to-catalog', () => {
    window.location.href = '/'
  })
}

document.addEventListener('DOMContentLoaded', initDetailPage)