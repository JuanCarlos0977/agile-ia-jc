# Instrucciones para testing

## Principios
*   **Unitarios con el código**: Los tests unitarios se escriben junto al archivo que prueban.
*   **Otros tests separados**: Tests de integración, E2E y otros van en una carpeta dedicada.
*   **Nomenclatura clara**: Usa el sufijo `.test.js` para identificar tests fácilmente.

## Estructura de Carpetas

### Tests Unitarios
Coloca el archivo de test **en la misma carpeta** que el módulo que prueba.

```
src/
├── utils/
│   ├── math.js          # Módulo con lógica
│   └── math.test.js     # SU test unitario (misma carpeta)
├── services/
│   ├── api.js
│   └── api.test.js
└── app.js
```

### Otros Tipos de Tests
Todos los demás tests se organizan dentro de la carpeta `/tests/` en la raíz del proyecto.

```
proyecto/
├── src/                 # Código fuente
├── tests/               # TODOS los demás tests
│   ├── integration/     # Tests de integración
│   ├── e2e/            # Tests de extremo a extremo
│   └── fixtures/        # Datos de prueba para los tests
└── ...
```

## Convenciones de Nombres
*   Para **tests unitarios**: `<nombre-del-modulo>.test.js` (ej: `calculadora.test.js`).
*   **No uses** `.spec.js` como sufijo para mantener consistencia.
*   En `/tests/`, nombra los archivos o carpetas de forma descriptiva (ej: `checkout.flow.e2e.js`).



## Comando para Ejecutar Tests
Ejecuta todos los tests del proyecto con:
```bash
npm test
```
