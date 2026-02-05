# Historia de Usuario US-001

## Visualizar catálogo de frutas
**Como** usuario
**Quiero** ver todas las frutas en la pantalla
**Para** poder elegirlas

## Criterios de Aceptación

### Escenario 1: Carga inicial del catálogo
**Dado** que el usuario accede a la aplicación
**Cuando** se carga la página principal
**Entonces** se muestran todas las frutas disponibles en cards cuadrada y proporcionada visualmente (misma altura y ancho)
**Y** se ven ordenadas en orden alfabético, de arriba a abajo.

### Escenario 2: Visualización de información de cada fruta
**Dado** que el catálogo está cargado
**Cuando** el usuario observa las frutas
**Entonces** puede ver que imagen de la fruta llena completamente el fondo sin cortes ni distorsiones
**Y** el nombre aparece claramente visible en la esquina superior izquierda sobre la imagen
**Y** el precio destaca en la esquina inferior derecha en color verde


## Notas
- Los datos de las frutas se obtienen de db.json
- Cada fruta tiene: id, nombre, precio e imagen

## Tareas
| Código | Nombre |
|--------|--------|
| TK-001-01 | Crear componente FruitCard |
| TK-001-02 | Implementar contenedor de la lista de cards |
| TK-001-03 | Definir API endpoint para obtener lista de frutas |
| TK-001-04 | Recopilar datos de frutas |
| TK-001-05 | Conectar fetch de datos a la API y renderizar dinámicamente las cards |




