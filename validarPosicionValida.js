// Función que verifica si una posición está dentro del tablero
export const posicionValida = (fila, columna) => {
    return fila >= 0 && fila < 8 && columna >= 0 && columna < 8;
}