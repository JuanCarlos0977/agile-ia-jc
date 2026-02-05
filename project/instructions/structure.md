# Instrucciones sobre la estructura

## Principios
Organiza los archivos según su función principal. Una estructura clara hace que el proyecto sea más fácil de navegar y mantener.

## Estructura Básica
```
proyecto/
├── public/           # Archivos estáticos finales
│   ├── favicon.ico
│   └── robots.txt
├── src/              # Código fuente
│   ├── styles/         # Hojas de estilo referenciadas (opcional)
│   ├── components/     # Módulos independientes (header.js, modal.js)
│   ├── lib/            # Código de terceros o utilidades complejas
│   ├── services/       # Lógica para APIs externas (api.js)
│   ├── main.js         # Lógica principal de la aplicación
│   ├── style.css       # Hoja de estilo principal
│   └── index.html      # Punto de entrada HTML (se procesa/build desde aquí)
├── test/             # Tests e2e y de integración
├── package.json      # Dependencias y scripts
└── vite.config.js    # Configuración del entorno (Vite)
```

## Reglas Simples
*   **HTML de entrada**: El archivo principal `index.html` está en `/src/`.
*   **JavaScript modular**: Separa la lógica en módulos dentro de `/src/` (ej: un archivo por componente o función principal).
*   **CSS organizado**: Mantén los estilos en `/src/style/`. Considera un archivo por sección principal si el proyecto crece.
*   **Assets estáticos**: Imágenes, fuentes, etc., van en `/public/` si no necesitan procesamiento.