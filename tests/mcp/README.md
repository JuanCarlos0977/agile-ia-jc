# Testing MCP para Agentes de IA

Esta carpeta contiene configuración y tests específicos para agentes de IA usando Playwright MCP.

## Metodología para Agentes

### 1. Preparación del Servidor (Puerto 5173)

```bash
# Verificar si el puerto está en uso
bash skills/e2e-testing/scripts/check_port.sh 5173

# Si está libre, iniciar servidor de desarrollo
npm run dev &

# Esperar 5-10 segundos para que el servidor esté listo
```

### 2. Herramientas MCP Disponibles

- `mcp_playwright_browser_navigate`: Navegar a URLs
- `mcp_playwright_browser_wait_for`: Esperar elementos o estados
- `mcp_playwright_browser_screenshot`: Capturar pantallas
- `mcp_playwright_browser_click`: Hacer click en elementos
- `mcp_playwright_browser_fill_form`: Rellenar formularios
- `mcp_playwright_browser_console_messages`: Ver logs de consola

### 3. Patrón de Testing Recomendado

```
1. navigate → 2. wait_for → 3. screenshot/verify
```

**CRÍTICO**: Siempre usar `wait_for` antes de screenshots para asegurar que los datos se han cargado.

### 4. URLs de Testing

- **Desarrollo**: `http://localhost:5173/`
- **API Mock**: `http://localhost:3100/` (si json-server está corriendo)

### 5. Estructura de Reportes

```markdown
## E2E Test Results

### Test Target
- URL: http://localhost:5173/xxx

### Execution Details
1. [Operaciones realizadas]
2. [Elementos verificados]

### Result
- ✅ Success / ❌ Failure
- Screenshot: [path]

### Issues (if any)
- [Error content]
- [Console logs]
```

## Diferencias con Testing Humano

| Aspecto | Agentes (MCP) | Humanos (npm) |
|---------|---------------|---------------|
| Puerto | 5173 (dev) | 4173 (build) |
| Herramientas | MCP tools individuales | Scripts automatizados |
| Servidor | Manual (npm run dev) | Automático (webServer) |
| Enfoque | Verificación interactiva | Tests automatizados |
| Configuración | playwright-mcp.config.js | playwright.config.js |

## Comandos Disponibles

```bash
# Tests MCP automatizados (fallback)
npm run test:mcp

# Tests MCP con UI
npm run test:mcp:ui

# Verificación manual con MCP tools
# (usar herramientas MCP directamente)
```