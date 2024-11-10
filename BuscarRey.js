// Función auxiliar para encontrar la posición del rey
export const encontrarRey = (esReyBlanco, matrix) => {
    const rey = esReyBlanco ? '♔' : '♚';
    for (let fila = 0; fila < 8; fila++) {
        for (let columna = 0; columna < 8; columna++) {
            if (matrix[fila][columna] === rey) {
                return { fila, columna };
            }
        }
    }
    return null;
}
