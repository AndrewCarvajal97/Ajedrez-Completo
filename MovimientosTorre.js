// Validación para la Torre
import { hayPiezasEnElCamino } from "./PiezasAdelante.js";
export const validarTorre = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix) => {
    const difFila = Math.abs(filaDestino - filaInicial);
    const difColumna = Math.abs(columnaDestino - columnaInicial);
    
    // Verificar movimiento horizontal o vertical
    if (difFila !== 0 && difColumna !== 0) {
        return false;
    }
    
    // Verificar si hay piezas en el camino
    return !hayPiezasEnElCamino(filaInicial, columnaInicial, filaDestino, columnaDestino, matrix);
}
