export const hayPiezasEnElCamino = (filaInicial, columnaInicial, filaDestino, columnaDestino, matrix) => {
    const difFila = filaDestino - filaInicial;
    const difColumna = columnaDestino - columnaInicial;
    
    // Determinar la dirección del movimiento
    const pasoFila = difFila === 0 ? 0 : difFila / Math.abs(difFila);
    const pasoColumna = difColumna === 0 ? 0 : difColumna / Math.abs(difColumna);
    
    let filaActual = filaInicial + pasoFila;
    let columnaActual = columnaInicial + pasoColumna;
    
    // Verificar cada casilla en el camino hasta llegar al destino (exclusive)
    while ((pasoFila === 0 || filaActual * pasoFila < filaDestino * pasoFila) &&
           (pasoColumna === 0 || columnaActual * pasoColumna < columnaDestino * pasoColumna)) {
        if (matrix[filaActual][columnaActual] !== '') {
            return true; // Hay una pieza en el camino
        }
        filaActual += pasoFila;
        columnaActual += pasoColumna;
    }
    
    return false;
}