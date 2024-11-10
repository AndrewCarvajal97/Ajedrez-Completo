import { encontrarRey } from "./BuscarRey.js";
import { esCasillaSeguraParaRey } from "./ValidarMovimientoSeguroRey.js";
// Función que actualiza la matriz y el DOM después de un movimiento válido
export const realizarMovimiento = (fichaOrigen, casillaDestino, matrix) => {
    const filaOrigen = parseInt(fichaOrigen.dataset.filaInicial);
    const columnaOrigen = parseInt(fichaOrigen.dataset.columnaInicial);
    const filaDestino = parseInt(casillaDestino.dataset.fila);
    const columnaDestino = parseInt(casillaDestino.dataset.columna);
    
    // Guardar el estado anterior para poder revertir si es necesario
    const piezaDestinoPrev = matrix[filaDestino][columnaDestino];
    const piezaOrigenPrev = matrix[filaOrigen][columnaOrigen];
    
    // Actualizar la matriz
    matrix[filaDestino][columnaDestino] = matrix[filaOrigen][columnaOrigen];
    matrix[filaOrigen][columnaOrigen] = '';
    
    // Verificar si el movimiento deja al rey propio en jaque
    const esBlanca = fichaOrigen.classList.contains('blanca');
    const posicionRey = encontrarRey(esBlanca, matrix);
    
    if (posicionRey && !esCasillaSeguraParaRey(posicionRey.fila, posicionRey.columna, esBlanca, matrix)) {
        // Revertir el movimiento si deja al rey en jaque
        matrix[filaOrigen][columnaOrigen] = piezaOrigenPrev;
        matrix[filaDestino][columnaDestino] = piezaDestinoPrev;
        return false;
    }
    
    // Actualizar el DOM
    const piezaDestino = casillaDestino.querySelector('.ficha');
    if (piezaDestino) {
        casillaDestino.removeChild(piezaDestino); // Capturar pieza
    }
    
    const casillaOrigen = fichaOrigen.parentNode;
    casillaOrigen.removeChild(fichaOrigen);
    casillaDestino.appendChild(fichaOrigen);
    
    // Actualizar las coordenadas de la ficha
    fichaOrigen.dataset.filaInicial = filaDestino;
    fichaOrigen.dataset.columnaInicial = columnaDestino;
    
    return true;
}