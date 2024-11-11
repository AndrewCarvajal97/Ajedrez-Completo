// Archivo: validarMovimiento.js

import { esCasillaSeguraParaRey } from "./validarPosicionValida.js";
import { encontrarRey } from "./BuscarRey.js";

export const estaEnJaque = (esReyBlanco, matrix) => {
    const { fila, columna } = encontrarRey(esReyBlanco, matrix);

    // Verificar si la casilla del rey está amenazada
    return !esCasillaSeguraParaRey(fila, columna, esReyBlanco, matrix);
};