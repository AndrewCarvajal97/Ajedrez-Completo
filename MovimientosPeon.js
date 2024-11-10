// Validación para el Peón
export const validarPeon = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, esBlanca, matrix) => {
    const direccion = esBlanca ? -1 : 1; // Dirección del movimiento según el color
    const filaInicio = esBlanca ? 6 : 1; // Fila inicial según el color
    const difFila = filaDestino - filaInicial;
    const difColumna = Math.abs(columnaDestino - columnaInicial);
    
    // Movimiento básico hacia adelante
    if (difColumna === 0) {
        // Movimiento simple
        if (difFila === direccion && matrix[filaDestino][columnaDestino] === '') {
            return true;
        }
        
        // Movimiento doble desde la posición inicial
        if (filaInicial === filaInicio && difFila === 2 * direccion &&
            matrix[filaDestino][columnaDestino] === '' &&
            matrix[filaInicial + direccion][columnaInicial] === '') {
            return true;
        }
    }
    
    // Captura en diagonal
    else if (difColumna === 1 && difFila === direccion) {
        return matrix[filaDestino][columnaDestino] !== '';
    }
    
    return false;
}