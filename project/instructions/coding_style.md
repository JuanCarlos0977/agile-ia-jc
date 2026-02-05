# Instrucciones sobre el estilo del código

## Principios
*   **Claro > Inteligente**: La legibilidad es fundamental.
*   **Consistente**: Mantén las mismas convenciones en todo el proyecto.
*   **Inglés**: Todo el código (variables, funciones, clases) se escribe en inglés.

## Convenciones
*   **Variables/Constantes**: `camelCase` (`userCount`). Constantes: `UPPER_SNAKE_CASE` (`API_BASE_URL`).
*   **Funciones/Métodos**: `camelCase` (`calculateTotal()`, `getUserById()`).
*   **Clases/Componentes**: `PascalCase` (`UserProfile`, `LoginService`).
*   **Archivos/Carpetas**: `kebab-case` (`user-service.js`, `components/`).
*   **Booleanos**: Usa prefijos como `is`, `has`, `should` (`isLoading`, `hasPermission`).

## Estructura
*   **Archivos**: Máximo 300-400 líneas. Divide si es más largo.
*   **Funciones**: Máximo 20-30 líneas. Haz una sola cosa.

## Calidad
*   **Sin console.log en prod**: Usa un sistema de logging.
*   **Sin números mágicos**: Usa constantes con nombre.
*   **DRY (Don't Repeat Yourself)**: Extrae la lógica duplicada a funciones.

## Comentarios
*   Explica el **"por qué"** (la intención o razón compleja), no el **"qué"** (el código obvio).