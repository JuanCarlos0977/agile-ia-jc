import { test, expect } from '@playwright/test'

// Test ejemplo para agentes de IA usando Playwright MCP
// Puerto 5173 (desarrollo) según skill e2e-testing

test.describe('Agent Verification Tests (MCP)', () => {
  test.beforeEach(async () => {
    // Nota: Este test asume que el servidor de desarrollo está corriendo en puerto 5173
    // Los agentes deben usar: npm run dev
    // Y verificar puerto con: bash skills/e2e-testing/scripts/check_port.sh 5173
  })

  test('verify homepage loads for agent testing', async ({ page }) => {
    // Navegar a la página de desarrollo
    await page.goto('http://localhost:5173/')
    
    // Esperar a que el contenido se cargue (importante para MCP)
    await page.waitForSelector('app-header', { timeout: 10000 })
    
    // Verificar que el header está presente
    await expect(page.locator('app-header')).toBeVisible()
    
    // Verificar el título del header
    const headerTitle = page.locator('app-header').locator('h1')
    await expect(headerTitle).toHaveText('Frutería')
    
    // Verificar que la página tiene título correcto
    await expect(page).toHaveTitle(/Frutería/)
  })

  test('verify page structure for agent validation', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    
    // Esperar a que el DOM esté listo
    await page.waitForLoadState('networkidle')
    
    // Verificar estructura básica
    await expect(page.locator('body')).toBeVisible()
    await expect(page.locator('app-header')).toBeVisible()
    
    // Verificar que no hay errores en consola críticos
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });
    
    // Recargar para capturar errores
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // No debería haber errores críticos de JavaScript
    const criticalErrors = logs.filter(log => 
      !log.includes('favicon.ico') && // Ignorar errores de favicon
      !log.includes('404')           // Ignorar 404s no críticos
    );
    
    expect(criticalErrors).toHaveLength(0);
  })
})