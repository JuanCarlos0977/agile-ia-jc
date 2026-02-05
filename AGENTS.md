# AGENTS.md - Guía para Agentes de IA

## Información del Proyecto
- **Tipo**: Aplicación web frontend con Vite y Web Components
- **Stack**: JavaScript ES6+, CSS, HTML, JSON Server (backend simulado)
- **Build Tool**: Vite
- **Testing**: Vitest + Happy-DOM + Playwright (configuración dual)

## Comandos de Build/Lint/Test

### Desarrollo
```bash
# Servidor de desarrollo
npm run dev

# Servidor JSON (API simulada)
npm run jsonserver
```

### Build y Deploy
```bash
# Crear build de producción
npm run build

# Preview del build localmente
npm run preview
```

### Testing Completo

Las tareas solo tinene tests unitarios y de integración.
Las historias de usuario sólo tienen tests e2e.

#### **Para Humanos (Desarrollo Manual)**
```bash
# Tests unitarios y componentes (watch mode)
npm test

# Ejecutar tests unitarios una vez
npm run test:run

# Interfaz web para tests unitarios
npm run test:ui

# Tests de integración y E2E (puerto 4173 - build)
npm run test:e2e

# Tests E2E con interfaz gráfica
npm run test:e2e:ui

# Tests E2E con navegador visible
npm run test:e2e:headed

# Instalar navegadores (solo primera vez)
npm run test:e2e:install

# Ejecutar todos los tests
npm run test:all
```

#### **Para Agentes de IA (Testing Automatizado)**
```bash
# Tests MCP con Playwright (puerto 5173 - dev)
npm run test:mcp

# Tests MCP con interfaz visual
npm run test:mcp:ui

# Usar herramientas MCP individuales:
# - mcp_playwright_browser_navigate
# - mcp_playwright_browser_screenshot
# - mcp_playwright_browser_click
# - Ver skills/e2e-testing/SKILL.md para metodología completa
```

### Tests Específicos
```bash
# Test específico unitario
npm test -- filename.test.js

# Test específico E2E humanos
npm run test:e2e -- tests/e2e/frutas.spec.js

# Test específico MCP agentes  
npm run test:mcp -- tests/mcp/agent-test.spec.js
```

**División de Responsabilidades:**
- **Vitest + Happy-DOM**: Tests unitarios y de componentes
- **Playwright Test (humanos)**: Tests automatizados en build (puerto 4173)
- **Playwright MCP (agentes)**: Tests interactivos en desarrollo (puerto 5173)

## Estructura del Proyecto

```
proyecto/
├── public/              # Archivos estáticos finales
├── src/                 # Código fuente
│   ├── components/      # Web Components (app-header.js)
│   │   └── *.test.js   # Tests unitarios de componentes
│   ├── services/        # Lógica para APIs externas
│   ├── utils/          # Utilidades (price-calculator.js)
│   │   └── *.test.js   # Tests unitarios de utilidades
│   ├── lib/            # Utilidades complejas
│   ├── main.js         # Punto de entrada JavaScript
│   ├── style.css       # Estilos principales
│   └── index.html      # HTML de entrada (procesado por Vite)
├── server/             # JSON Server data
│   └── db.json        # Base de datos simulada
├── tests/             # Tests E2E e integración
│   ├── mcp/           # Tests para agentes IA (puerto 5173)
│   ├── e2e/           # Tests E2E humanos (puerto 4173)
│   ├── integration/   # Tests de integración
│   └── frutas.http    # Tests API manuales
├── skills/            # Skills para agentes
│   └── e2e-testing/   # Metodología E2E para agentes
├── project/           # Documentación del proyecto
│   ├── instructions.md      # Instrucciones generales
│   ├── instructions/        # Instrucciones específicas
│   ├── stories/            # Historias de usuario
│   └── kanban.md          # Estado del proyecto
├── vitest.config.js         # Configuración Vitest + Happy-DOM
├── playwright.config.js     # Playwright humanos (puerto 4173)
└── playwright-mcp.config.js # Playwright agentes (puerto 5173)
```

## Convenciones de Código

### Nomenclatura
- **Variables/Funciones**: `camelCase` (`calculateTotal`, `userCount`)
- **Constantes**: `UPPER_SNAKE_CASE` (`API_BASE_URL`)
- **Clases/Componentes**: `PascalCase` (`AppHeader`, `UserService`)
- **Archivos/Carpetas**: `kebab-case` (`app-header.js`, `user-service.js`)
- **Booleanos**: Prefijos `is`, `has`, `should` (`isLoading`, `hasPermission`)

### Idioma
- **Código**: Todo en inglés (variables, funciones, comentarios técnicos)
- **Contenido/UI**: En español (textos de usuario, mensajes)
- **Datos**: En español (como en `server/db.json`)

### Formato de Archivos
- **Máximo**: 300-400 líneas por archivo
- **Funciones**: Máximo 20-30 líneas, una responsabilidad
- **Indentación**: 2 espacios (estándar JavaScript)

### Importaciones
```javascript
// Orden de imports:
import './style.css'                    // Estilos
import './components/app-header.js'     // Componentes locales
import { API_BASE_URL } from './config' // Utilidades locales
```

### Web Components
```javascript
class ComponentName extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Estilos encapsulados */
      </style>
      <div>Content</div>
    `
  }
}

customElements.define('component-name', ComponentName)
```

## Testing

### Estructura de Tests
```
src/
├── utils/
│   ├── math.js          # Código
│   └── math.test.js     # Test unitario (misma carpeta)
tests/
├── mcp/                 # Tests para agentes IA (puerto 5173)
├── e2e/                # Tests E2E humanos (puerto 4173)
├── integration/         # Tests de integración
└── fixtures/           # Datos de prueba
```

### Convenciones de Testing
- **Tests unitarios**: `filename.test.js` en la misma carpeta del módulo
- **No usar**: `.spec.js` como sufijo para tests unitarios
- **Tests E2E**: `.spec.js` para tests de Playwright
- **Separación**: `/tests/mcp/` para agentes, `/tests/e2e/` para humanos

## Manejo de Errores

### Principios
- **Sin console.log en producción**: Usar sistema de logging
- **Sin números mágicos**: Constantes con nombres descriptivos
- **DRY**: Extraer lógica duplicada a funciones

### Comentarios
- Explicar el **"por qué"** (intención), no el **"qué"** (código obvio)
- Documentar decisiones técnicas complejas
- Mantener comentarios actualizados

## API y Datos

### JSON Server
```bash
# Servidor en puerto 3100
npm run jsonserver

# Endpoints disponibles:
# GET /frutas
# GET /frutas/:id
# POST /frutas
# PUT /frutas/:id
# DELETE /frutas/:id
```

### Estructura de Datos
```javascript
// Ejemplo de fruta en db.json
{
  "id": 1,
  "nombre": "Manzana",
  "precio": 2.50,
  "imagen": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300"
}
```

## Flujo de Trabajo para Agentes

### Antes de Modificar Código
1. **Leer**: `project/instructions.md` para contexto
2. **Verificar**: Estado actual en `project/kanban.md`
3. **Consultar**: Historias de usuario en `project/stories/`
4. **Revisar**: Instrucciones específicas en `project/instructions/[tema].md`
5. **Skills**: Consultar metodologías especializadas en `skills/[nombre]/SKILL.md`

### Metodología de Testing para Agentes

#### **Preparación del Servidor (Puerto 5173)**
```bash
# 1. Verificar estado del puerto
bash skills/e2e-testing/scripts/check_port.sh 5173

# 2. Si está libre, iniciar servidor de desarrollo
npm run dev &

# 3. Esperar 5-10 segundos para que esté listo
```

#### **Patrón de Testing MCP**
```
1. navigate → 2. wait_for → 3. screenshot/verify
```

**CRÍTICO**: Siempre usar `wait_for` antes de screenshots para asegurar carga de datos.

#### **Herramientas MCP Disponibles**
- `mcp_playwright_browser_navigate`: Navegar a URLs
- `mcp_playwright_browser_wait_for`: Esperar elementos/estados
- `mcp_playwright_browser_screenshot`: Capturar pantallas
- `mcp_playwright_browser_click`: Hacer click en elementos
- `mcp_playwright_browser_fill_form`: Rellenar formularios
- `mcp_playwright_browser_console_messages`: Ver logs

#### **URLs de Testing para Agentes**
- **Desarrollo**: `http://localhost:5173/`
- **API Mock**: `http://localhost:3100/` (si json-server activo)

### Skills Disponibles

Los **skills** son metodologías especializadas para tareas específicas, ubicadas en `/skills/[nombre]/SKILL.md`:

#### **E2E Testing** (`skills/e2e-testing/`)
- **Metodología completa** para testing con Playwright MCP
- **Scripts de utilidad**: `check_port.sh` para verificación de puertos
- **Patrones de testing**: navigate → wait_for → screenshot
- **Manejo de servidores**: Puerto 5173 y gestión de procesos
- **Troubleshooting**: Soluciones a problemas comunes

#### **Cómo Usar Skills**
```bash
# Consultar skill específico
cat skills/e2e-testing/SKILL.md

# Usar scripts del skill
bash skills/e2e-testing/scripts/check_port.sh 5173
```

### Jerarquía de Autoridad
1. Requerimientos del negocio (historias de usuario)
2. Instrucciones técnicas específicas
3. Mejores prácticas de la industria
4. Preferencias del mantenedor

### Entregables Esperados
- **Código**: Comentado, siguiendo convenciones
- **Tests**: Para nueva funcionalidad
- **Documentación**: Actualizar si es necesario

## Restricciones Críticas

### Prohibido
- Leer/modificar archivos fuera del directorio del proyecto
- Introducir dependencias no aprobadas
- Saltarse procesos de testing
- Crear soluciones over-engineered
- Usar `console.log` en código de producción

### Límites Técnicos
- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+
- **Bundle**: < 500KB inicial, < 2MB total
- **Tiempo de carga**: < 3 segundos en 3G
- **Dependencias**: Solo paquetes con auditoría de seguridad

## Comandos Útiles

```bash
# Desarrollo concurrente (frontend + API)
npm run dev & npm run jsonserver

# Verificar build antes de deploy
npm run build && npm run preview

# Limpiar y reinstalar dependencias
rm -rf node_modules package-lock.json && npm install
```

---

**Nota**: Este proyecto sigue un enfoque pragmático. Consulta siempre ante ambigüedades y documenta decisiones técnicas importantes.