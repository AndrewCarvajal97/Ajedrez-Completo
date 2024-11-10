// Validación para el Caballo
import { posicionValida } from "./validarPosicionValida.js";

export const validarCaballo = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix) => {
    const difFila = Math.abs(filaDestino - filaInicial);
    const difColumna = Math.abs(columnaDestino - columnaInicial);
    
    // Verificar el patrón en "L" del caballo
    if (!((difFila === 2 && difColumna === 1) || (difFila === 1 && difColumna === 2))) {
        return false;
    }
    
    // Verificar que la posición destino esté dentro del tablero
    if (!posicionValida(filaDestino, columnaDestino)) {
        return false;
    }
    
    // El caballo puede saltar sobre otras piezas, solo necesitamos verificar
    // que la casilla destino esté vacía o contenga una pieza enemiga
    const piezaDestino = matrix[filaDestino][columnaDestino];
    if (piezaDestino === '') {
        return true;
    }
    
    // Si hay una pieza en el destino, verificar si es del color opuesto
    const esBlanca = fichaInterior.classList.contains('blanca');
    const piezaDestinoEsBlanca = ['♔', '♕', '♖', '♗', '♘', '♙'].includes(piezaDestino);
    
    return esBlanca !== piezaDestinoEsBlanca;
}