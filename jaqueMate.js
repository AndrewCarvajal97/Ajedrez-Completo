import { validarMovimientos } from "./validarMovimiento.js";
import { encontrarRey } from "./BuscarRey.js";

export const estaEnJaqueMate = (esReyBlanco, matrix) => {
    const { fila: filaRey, columna: columnaRey } = encontrarRey(esReyBlanco, matrix);

    // Verificar si hay algún movimiento válido para el rey
    for (let fila = 0; fila < 8; fila++) {
        for (let columna = 0; columna < 8; columna++) {
            const casilla = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
            if (validarMovimientos(matrix[filaRey][columnaRey], casilla, matrix)) {
                return false;
            }
        }
    }

    // Si no hay movimientos válidos, el rey está en jaque mate
    return true;
};