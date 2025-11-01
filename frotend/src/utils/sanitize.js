// utils/sanitize.js
/**
 * Sanitiza una cadena eliminando caracteres peligrosos y espacios innecesarios.
 * @param {string} value - Valor a sanitizar.
 * @param {number} maxLength - Longitud máxima permitida (opcional).
 * @returns {string} Cadena sanitizada.
 */
export function sanitizeInput(value, maxLength = 100) {
  return value.replace(/[<>"'`]/g, '').trim().slice(0, maxLength);
}
