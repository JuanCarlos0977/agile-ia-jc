import { test, expect } from '@playwright/test'

test.describe('Basic Navigation Tests', () => {
  test('should load homepage with header', async ({ page }) => {
    await page.goto('/')
    
    // Verificar que el header se carga
    await expect(page.locator('app-header')).toBeVisible()
    
    // Verificar que el título está presente
    const header = page.locator('app-header').locator('h1')
    await expect(header).toHaveText('Frutería')
  })

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/')
    
    // Verificar que la página tiene título
    await expect(page).toHaveTitle(/Frutería/)
    
    // Verificar que el header tiene estilos aplicados
    const headerElement = page.locator('app-header')
    await expect(headerElement).toBeVisible()
    
    // Verificar que la página se carga completamente
    await expect(page.locator('body')).toBeVisible()
  })

  test('should handle page refresh correctly', async ({ page }) => {
    await page.goto('/')
    
    // Verificar carga inicial
    await expect(page.locator('app-header h1')).toHaveText('Frutería')
    
    // Refrescar página
    await page.reload()
    
    // Verificar que sigue funcionando después del refresh
    await expect(page.locator('app-header h1')).toHaveText('Frutería')
  })
})