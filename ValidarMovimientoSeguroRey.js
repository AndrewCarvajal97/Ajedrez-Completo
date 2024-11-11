import { posicionValida } from "./validarPosicionValida.js";
// Función para verificar si una casilla está amenazada (para el rey)

export const esCasillaSeguraParaRey = (fila, columna, esReyBlanco, matrix) => {
    // Verificar amenazas de peones
    const direccionPeon = esReyBlanco ? -1 : 1;
    const peonEnemigo = esReyBlanco ? '♟' :'♙' ;
    
    // Verificar amenazas de peones en diagonales
    if (posicionValida(fila + direccionPeon, columna - 1) &&
        matrix[fila + direccionPeon][columna - 1] === peonEnemigo) {
        return false;
    }
    if (posicionValida(fila + direccionPeon, columna + 1) &&
        matrix[fila + direccionPeon][columna + 1] === peonEnemigo) {
        return false;
    }
    
    // Verificar amenazas de caballos
    const movimientosCaballo = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    const caballoEnemigo = esReyBlanco ? '♞' : '♘';
    
    for (const [dfila, dcolumna] of movimientosCaballo) {
        const nuevaFila = fila + dfila;
        const nuevaColumna = columna + dcolumna;
        if (posicionValida(nuevaFila, nuevaColumna) &&
            matrix[nuevaFila][nuevaColumna] === caballoEnemigo) {
            return false;
        }
    }
    
    // Verificar amenazas en las direcciones de la torre/reina
    const direccionesTorre = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const torreEnemigas = esReyBlanco ? ['♜', '♛'] : ['♖', '♕'];
    
    for (const [dfila, dcolumna] of direccionesTorre) {
        let nuevaFila = fila + dfila;
        let nuevaColumna = columna + dcolumna;
        while (posicionValida(nuevaFila, nuevaColumna)) {
            const pieza = matrix[nuevaFila][nuevaColumna];
            if (pieza !== '') {
                if (torreEnemigas.includes(pieza)) {
                    return false;
                }
                break;
            }
            nuevaFila += dfila;
            nuevaColumna += dcolumna;
        }
    }
    
    // Verificar amenazas en las direcciones del alfil/reina
    const direccionesAlfil = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    const alfilEnemigo = esReyBlanco ? ['♝', '♛'] : ['♗', '♕'];
    
    for (const [dfila, dcolumna] of direccionesAlfil) {
        let nuevaFila = fila + dfila;
        let nuevaColumna = columna + dcolumna;
        while (posicionValida(nuevaFila, nuevaColumna)) {
            const pieza = matrix[nuevaFila][nuevaColumna];
            if (pieza !== '') {
                if (alfilEnemigo.includes(pieza)) {
                    return false;
                }
                break;
            }
            nuevaFila += dfila;
            nuevaColumna += dcolumna;
        }
    }
    
    return true;
}