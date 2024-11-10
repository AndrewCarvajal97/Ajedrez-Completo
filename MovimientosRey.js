import { posicionValida } from "./validarPosicionValida.js";
import { esCasillaSeguraParaRey } from "./ValidarMovimientoSeguroRey.js";


// Validación para el Rey
export const validarRey = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix) => {
    const difFila = Math.abs(filaDestino - filaInicial);
    const difColumna = Math.abs(columnaDestino - columnaInicial);
    
    // Verificar movimiento básico del rey (una casilla en cualquier dirección)
    if (difFila > 1 || difColumna > 1) {
        return false;
    }
    
    // Verificar que la posición destino esté dentro del tablero
    if (!posicionValida(filaDestino, columnaDestino)) {
        return false;
    }
    
    // Verificar si la casilla destino está vacía o tiene una pieza enemiga
    const piezaDestino = matrix[filaDestino][columnaDestino];
    if (piezaDestino === '') {
        return true;
    }
    
    // Si hay una pieza en el destino, verificar si es del color opuesto
    const esBlanca = fichaInterior.classList.contains('blanca');
    const piezaDestinoEsBlanca = ['♔', '♕', '♖', '♗', '♘', '♙'].includes(piezaDestino);
    
    // Verificar que el rey no se mueva a una casilla amenazada
    if (!esCasillaSeguraParaRey(filaDestino, columnaDestino, esBlanca, matrix)) {
        return false;
    }
    
    return esBlanca !== piezaDestinoEsBlanca;
}
