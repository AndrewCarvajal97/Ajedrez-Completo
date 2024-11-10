// Validación para el Alfil
import { hayPiezasEnElCamino } from "./PiezasAdelante.js";
export const validarAlfil = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix) => {
    const difFila = Math.abs(filaDestino - filaInicial);
    const difColumna = Math.abs(columnaDestino - columnaInicial);
    
    // Verificar movimiento diagonal
    if (difFila !== difColumna) {
        return false;
    }
    
    // Verificar si hay piezas en el camino
    return !hayPiezasEnElCamino(filaInicial, columnaInicial, filaDestino, columnaDestino, matrix);
}