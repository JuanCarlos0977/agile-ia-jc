import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchFruits, sortFruitsAlphabetically } from './fruit-service.js'

describe('FruitService', () => {
  describe('fetchFruits', () => {
    beforeEach(() => {
      vi.restoreAllMocks()
    })

    it('should fetch fruits from API', async () => {
      const mockFruits = [
        { id: 1, nombre: 'Manzana', precio: 2.50, imagen: 'url1' },
        { id: 2, nombre: 'Plátano', precio: 1.80, imagen: 'url2' }
      ]

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockFruits)
      })

      const result = await fetchFruits()
      expect(result).toEqual(mockFruits)
      expect(fetch).toHaveBeenCalledWith('http://localhost:3100/frutas')
    })

    it('should throw error when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false
      })

      await expect(fetchFruits()).rejects.toThrow('Error fetching fruits')
    })
  })

  describe('sortFruitsAlphabetically', () => {
    it('should sort fruits by name alphabetically', () => {
      const fruits = [
        { nombre: 'Naranja', precio: 2.20 },
        { nombre: 'Manzana', precio: 2.50 },
        { nombre: 'Plátano', precio: 1.80 }
      ]

      const sorted = sortFruitsAlphabetically(fruits)

      expect(sorted[0].nombre).toBe('Manzana')
      expect(sorted[1].nombre).toBe('Naranja')
      expect(sorted[2].nombre).toBe('Plátano')
    })

    it('should handle Spanish characters correctly', () => {
      const fruits = [
        { nombre: 'Níspero', precio: 4.50 },
        { nombre: 'Naranja', precio: 2.20 },
        { nombre: 'Ñoño', precio: 1.00 }
      ]

      const sorted = sortFruitsAlphabetically(fruits)

      expect(sorted[0].nombre).toBe('Naranja')
      expect(sorted[1].nombre).toBe('Níspero')
      expect(sorted[2].nombre).toBe('Ñoño')
    })

    it('should not mutate original array', () => {
      const fruits = [
        { nombre: 'Naranja', precio: 2.20 },
        { nombre: 'Manzana', precio: 2.50 }
      ]
      const original = [...fruits]

      sortFruitsAlphabetically(fruits)

      expect(fruits).toEqual(original)
    })

    it('should handle empty array', () => {
      const sorted = sortFruitsAlphabetically([])
      expect(sorted).toEqual([])
    })

    it('should handle single element', () => {
      const fruits = [{ nombre: 'Manzana', precio: 2.50 }]
      const sorted = sortFruitsAlphabetically(fruits)
      expect(sorted.length).toBe(1)
      expect(sorted[0].nombre).toBe('Manzana')
    })
  })
})
