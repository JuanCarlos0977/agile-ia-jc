/**
 * Calcula el total de precios de frutas
 * @param {Array} frutas - Array de objetos fruta con propiedad precio
 * @returns {number} - Total calculado
 */
export function calculateTotal(frutas) {
  if (!Array.isArray(frutas)) {
    throw new Error('Se esperaba un array de frutas')
  }

  return frutas.reduce((total, fruta) => {
    const precio = parseFloat(fruta.precio) || 0
    return total + precio
  }, 0)
}

/**
 * Calcula el precio con descuento
 * @param {number} precio - Precio original
 * @param {number} descuento - Porcentaje de descuento (0-100)
 * @returns {number} - Precio con descuento aplicado
 */
export function applyDiscount(precio, descuento) {
  if (precio < 0 || descuento < 0 || descuento > 100) {
    throw new Error('Valores inválidos para precio o descuento')
  }

  return precio * (1 - descuento / 100)
}