# Instrucciones de despliegue

## Objetivo
Este documento explica cómo preparar el proyecto para producción. Nos detenemos en la generación del **build**, que es el paquete optimizado y listo para subir a cualquier servidor.

## Comando para Build
El proceso es siempre el mismo, independientemente de la herramienta (Vite, Webpack, etc.):

```bash
npm run build
```
Este comando crea una carpeta `dist/` con todo listo para pasárselo a un servidor web.

## Contenido de la Carpeta de Build
La carpeta generada contendrá:
*   **`index.html`**: El archivo HTML procesado, con los enlaces a CSS y JS inyectados y optimizados.
*   **`assets/`**: Una subcarpeta con todos los archivos JavaScript y CSS minificados y renombrados.
*   Copias optimizadas de los archivos estáticos de la carpeta `public/`.

## Regla de Despliegue
**Solo se despliega el contenido de la carpeta `dist/``.** Nunca se suben la carpeta `src/`, `node_modules/` o los archivos de configuración del entorno de desarrollo.

## Verificación Local
Antes de desplegar, puedes verificar que el build funciona correctamente localmente con:
```bash
npm run preview
```
