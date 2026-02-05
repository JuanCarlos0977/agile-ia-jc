import { defineConfig, devices } from '@playwright/test'

// Configuración para agentes de IA usando Playwright MCP
// Puerto 5173 (desarrollo) según skill e2e-testing
export default defineConfig({
  testDir: './tests/mcp',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium-mcp',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  // No configuramos webServer aquí porque los agentes 
  // manejan el servidor de desarrollo manualmente
  reporter: [['html', { outputFolder: 'test-results-mcp' }]]
})