import { describe, it, expect } from 'vitest'
import { calculateTotal, applyDiscount } from './price-calculator.js'

describe('Price Calculator Utils', () => {
  
  describe('calculateTotal', () => {
    it('should calculate total of fruit prices correctly', () => {
      const frutas = [
        { precio: 2.50 },
        { precio: 1.80 },
        { precio: 3.20 }
      ]
      
      expect(calculateTotal(frutas)).toBe(7.50)
    })

    it('should handle empty array', () => {
      expect(calculateTotal([])).toBe(0)
    })

    it('should handle fruits with missing price', () => {
      const frutas = [
        { precio: 2.50 },
        { nombre: 'Manzana' }, // Sin precio
        { precio: 1.80 }
      ]
      
      expect(calculateTotal(frutas)).toBe(4.30)
    })

    it('should handle string prices', () => {
      const frutas = [
        { precio: '2.50' },
        { precio: '1.80' }
      ]
      
      expect(calculateTotal(frutas)).toBe(4.30)
    })

    it('should throw error for non-array input', () => {
      expect(() => calculateTotal('not an array')).toThrow('Se esperaba un array de frutas')
      expect(() => calculateTotal(null)).toThrow('Se esperaba un array de frutas')
    })
  })

  describe('applyDiscount', () => {
    it('should apply 10% discount correctly', () => {
      expect(applyDiscount(100, 10)).toBe(90)
    })

    it('should apply 50% discount correctly', () => {
      expect(applyDiscount(20, 50)).toBe(10)
    })

    it('should handle 0% discount', () => {
      expect(applyDiscount(15.50, 0)).toBe(15.50)
    })

    it('should handle 100% discount', () => {
      expect(applyDiscount(25, 100)).toBe(0)
    })

    it('should throw error for negative prices', () => {
      expect(() => applyDiscount(-10, 20)).toThrow('Valores inválidos para precio o descuento')
    })

    it('should throw error for invalid discount percentages', () => {
      expect(() => applyDiscount(100, -5)).toThrow('Valores inválidos para precio o descuento')
      expect(() => applyDiscount(100, 150)).toThrow('Valores inválidos para precio o descuento')
    })
  })
})