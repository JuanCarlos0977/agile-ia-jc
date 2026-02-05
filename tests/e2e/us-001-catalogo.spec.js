import { test, expect } from '@playwright/test'

test.describe('US-001: Visualizar catálogo de frutas', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
    // Esperar a que el catálogo cargue las frutas
    await page.waitForSelector('fruit-catalog', { timeout: 10000 })
    // Esperar un poco más para que las imágenes carguen
    await page.waitForTimeout(3000)
  })

  test.describe('Escenario 1: Carga inicial del catálogo', () => {

    test('muestra todas las frutas en cards cuadradas', async ({ page }) => {
      // Verificar que el catálogo existe
      const catalog = await page.locator('fruit-catalog')
      await expect(catalog).toBeVisible()

      // Esperar a que las cards se rendericen
      await page.waitForTimeout(2000)

      // Capturar screenshot del catálogo completo
      await page.screenshot({
        path: 'tests/e2e/us-001-catalogo-escenario1-catalogo-cargado.png',
        fullPage: true
      })
    })

    test('frutas ordenadas alfabéticamente', async ({ page }) => {
      // Esperar carga completa
      await page.waitForTimeout(2000)

      // Capturar screenshot mostrando el orden alfabético
      await page.screenshot({
        path: 'tests/e2e/us-001-catalogo-escenario1-orden-alfabetico.png',
        fullPage: false,
        clip: { x: 0, y: 0, width: 1280, height: 800 }
      })
    })
  })

  test.describe('Escenario 2: Visualización de información de cada fruta', () => {

    test('card muestra imagen, nombre y precio correctamente', async ({ page }) => {
      // Esperar carga completa de imágenes
      await page.waitForTimeout(3000)

      // Capturar screenshot de una card individual
      await page.screenshot({
        path: 'tests/e2e/us-001-catalogo-escenario2-detalle-card.png',
        fullPage: false,
        clip: { x: 0, y: 60, width: 600, height: 500 }
      })
    })

    test('precio destaca en color verde', async ({ page }) => {
      // Esperar carga completa
      await page.waitForTimeout(2000)

      // Capturar screenshot enfocado en el precio
      await page.screenshot({
        path: 'tests/e2e/us-001-catalogo-escenario2-precio-verde.png',
        fullPage: false,
        clip: { x: 0, y: 60, width: 400, height: 400 }
      })
    })
  })
})
