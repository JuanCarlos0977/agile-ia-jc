import { test, expect } from '@playwright/test'

test.describe('US-002: Catalog Card Click Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('should display catalog cards', async ({ page }) => {
    await page.waitForSelector('fruit-card')
    const cards = await page.locator('fruit-card').count()
    expect(cards).toBeGreaterThan(0)
  })

  test('should have cursor pointer style on cards', async ({ page }) => {
    await page.waitForSelector('fruit-card')
    
    const card = await page.locator('fruit-card').first()
    const cursor = await card.evaluate((el) => {
      const shadowRoot = el.shadowRoot
      const cardDiv = shadowRoot.querySelector('.card')
      return window.getComputedStyle(cardDiv).cursor
    })
    
    expect(cursor).toBe('pointer')
  })

  test('should emit fruit-click event when card is clicked', async ({ page }) => {
    await page.waitForSelector('fruit-card')
    
    const firstCard = page.locator('fruit-card').first()
    
    let eventData = null
    await page.evaluate(() => {
      document.addEventListener('fruit-click', (event) => {
        window.testEventData = event.detail
      })
    })
    
    await firstCard.click()
    
    eventData = await page.evaluate(() => window.testEventData)
    
    expect(eventData).toBeTruthy()
    expect(eventData).toHaveProperty('fruitId')
    expect(eventData).toHaveProperty('name')
  })

  test('should emit fruit-selected event from catalog', async ({ page }) => {
    await page.waitForSelector('fruit-card')
    
    const firstCard = page.locator('fruit-card').first()
    
    let catalogEventData = null
    await page.evaluate(() => {
      document.addEventListener('fruit-selected', (event) => {
        window.testCatalogEventData = event.detail
      })
    })
    
    await firstCard.click()
    
    catalogEventData = await page.evaluate(() => window.testCatalogEventData)
    
    expect(catalogEventData).toBeTruthy()
    expect(catalogEventData).toHaveProperty('fruitId')
    expect(catalogEventData).toHaveProperty('name')
  })

  test('should log fruit selection to console', async ({ page }) => {
    await page.waitForSelector('fruit-card')
    
    const firstCard = page.locator('fruit-card').first()
    
    const messages = []
    page.on('console', msg => {
      if (msg.text().includes('Fruit selected:')) {
        messages.push(msg.text())
      }
    })
    
    await firstCard.click()
    
    expect(messages.length).toBeGreaterThan(0)
    expect(messages[0]).toContain('Fruit selected:')
    expect(messages[0]).toContain('ID:')
  })

  test('should have hover effect on cards', async ({ page }) => {
    await page.waitForSelector('fruit-card')
    
    const card = page.locator('fruit-card').first()
    
    const hoverTransform = await card.evaluate((el) => {
      const shadowRoot = el.shadowRoot
      const cardDiv = shadowRoot.querySelector('.card')
      const style = window.getComputedStyle(cardDiv, ':hover')
      return style.transform
    })
    
    const transition = await card.evaluate((el) => {
      const shadowRoot = el.shadowRoot
      const cardDiv = shadowRoot.querySelector('.card')
      return window.getComputedStyle(cardDiv).transition
    })
    
    expect(transition).toContain('transform')
  })

  test('should pass data-id attribute to cards', async ({ page }) => {
    await page.waitForSelector('fruit-card')
    
    const firstCard = page.locator('fruit-card').first()
    const dataId = await firstCard.getAttribute('data-id')
    
    expect(dataId).toBeTruthy()
    expect(dataId).toMatch(/^\d+$/)
  })
})