# Historia de Usuario US-002

## Ver detalle de una fruta
**Como** usuario
**Quiero** hacer click en una card de fruta
**Para** ver todos sus detalles en una página nueva

## Criterios de Aceptación

### Escenario 1: Navegación al detalle
**Dado** que el usuario está viendo el catálogo de frutas
**Cuando** hace click en una card de fruta
**Entonces** se abre una página nueva con los detalles de esa fruta

### Escenario 2: Visualización de detalles completos
**Dado** que el usuario está en la página de detalle
**Cuando** observa la información
**Entonces** puede ver el nombre, precio e imagen de la fruta seleccionada

### Escenario 3: Volver al catálogo
**Dado** que el usuario está en la página de detalle
**Cuando** quiere volver al catálogo
**Entonces** puede navegar de vuelta a la lista de frutas

## Notas
- Depende de US-001 (catálogo de frutas)
- La página de detalle recibe el id de la fruta como parámetro

## Tareas
| Código | Nombre |
|--------|--------|
| TK-002-01 | hacer que cada card del catalogo se clickable |
| TK-002-02 | crear evento que capture el id de la fruta y lo envie a la pagina detalle |
| TK-002-03 | crear pagina nueva para detalles de una fruta |
| TK-002-04 | crear un componente de detalle de fruta con nombre, precio e imagen de la frura |
| TK-002-05 | crear boton de volver al catalogo |
| TK-002-06 | crear test para comprobar la funcionalidad |


