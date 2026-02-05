import { test, expect } from '@playwright/test'

test.describe('API Integration Tests', () => {
  test.beforeAll(async () => {
    // Nota: Estos tests asumen que json-server está corriendo en puerto 3100
    // Ejecutar: npm run jsonserver en una terminal separada
  })

  test('should fetch fruits from API', async ({ request }) => {
    const response = await request.get('http://localhost:3100/frutas')
    
    expect(response.ok()).toBeTruthy()
    
    const frutas = await response.json()
    expect(Array.isArray(frutas)).toBeTruthy()
    expect(frutas.length).toBeGreaterThan(0)
  })

  test('should get specific fruit by ID', async ({ request }) => {
    const response = await request.get('http://localhost:3100/frutas/1')
    
    expect(response.ok()).toBeTruthy()
    
    const fruta = await response.json()
    expect(fruta).toHaveProperty('id', 1)
    expect(fruta).toHaveProperty('nombre')
    expect(fruta).toHaveProperty('precio')
    expect(fruta).toHaveProperty('imagen')
  })

  test('should handle non-existent fruit ID', async ({ request }) => {
    const response = await request.get('http://localhost:3100/frutas/999999')
    
    // json-server devuelve 404 para IDs que no existen
    expect(response.status()).toBe(404)
  })

  test('should validate fruit data structure', async ({ request }) => {
    const response = await request.get('http://localhost:3100/frutas')
    const frutas = await response.json()
    
    // Verificar que las primeras frutas tienen la estructura esperada
    const primerasFrutas = frutas.slice(0, 5)
    
    for (const fruta of primerasFrutas) {
      expect(fruta).toHaveProperty('id')
      expect(fruta).toHaveProperty('nombre')
      expect(fruta).toHaveProperty('precio')
      expect(fruta).toHaveProperty('imagen')
      
      expect(typeof fruta.id).toBe('number')
      expect(typeof fruta.nombre).toBe('string')
      expect(typeof fruta.precio).toBe('number')
      expect(typeof fruta.imagen).toBe('string')
    }
  })
})