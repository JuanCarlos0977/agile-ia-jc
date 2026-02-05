import { test, expect } from '@playwright/test'

test.describe('Fruit Detail Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('should navigate to fruit detail when clicking a card', async ({ page }) => {
    await page.waitForSelector('fruit-card')
    const firstCard = page.locator('fruit-card').first()
    await firstCard.click()
    
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/fruit-detail.html')
  })

  test('should display fruit details correctly', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForSelector('fruit-card')
    
    const firstCard = page.locator('fruit-card').first()
    await firstCard.click()
    
    await page.waitForLoadState('networkidle')
    
    await expect(page.locator('.detail-name')).toBeVisible()
    await expect(page.locator('.detail-price')).toBeVisible()
    await expect(page.locator('.detail-image')).toBeVisible()
    await expect(page.locator('.back-button')).toBeVisible()
  })

  test('should return to catalog when clicking back button', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForSelector('fruit-card')
    
    const firstCard = page.locator('fruit-card').first()
    await firstCard.click()
    
    await page.waitForLoadState('networkidle')
    await page.locator('.back-button').click()
    
    await page.waitForLoadState('networkidle')
    expect(page.url()).toBe('http://localhost:5173/')
  })

  test('should show loading state initially', async ({ page }) => {
    await page.goto('http://localhost:5173/fruit-detail.html?id=1')
    
    await expect(page.locator('.loading')).toBeVisible()
    await expect(page.locator('.loading')).toHaveText('Cargando detalles de la fruta...')
  })
})