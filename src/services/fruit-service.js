const API_BASE_URL = 'http://localhost:3100'

export async function fetchFruits() {
  const response = await fetch(`${API_BASE_URL}/frutas`)
  if (!response.ok) {
    throw new Error('Error fetching fruits')
  }
  return response.json()
}

export function sortFruitsAlphabetically(fruits) {
  return [...fruits].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
  )
}

export async function getFruitById(id) {
  const response = await fetch(`${API_BASE_URL}/frutas/${id}`)
  if (!response.ok) {
    throw new Error(`Error fetching fruit with id ${id}`)
  }
  return response.json()
}
