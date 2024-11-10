import { puedeCapturar } from "./ValidarComerFicha.js";
import { validarPeon } from "./MovimientosPeon.js";
import { validarAlfil } from "./MovimientosAlfil.js";
import { validarTorre } from "./MovimientosTorre.js";
import { validarCaballo } from "./MovimientosCaballo.js";
import { posicionValida } from "./validarPosicionValida.js";
import { validarRey } from "./MovimientosRey.js";
import { esCasillaSeguraParaRey } from "./ValidarMovimientoSeguroRey.js";
import { encontrarRey } from "./BuscarRey.js";


// Función para probar movimientos válidos sin realizarlos
const probarMovimiento = (fichaInterior, fila, columna, matrix) => {
    // Crear una copia de la matriz para no modificar la original
    const matrixTemp = matrix.map(row => [...row]);
    const filaInicial = parseInt(fichaInterior.dataset.filaInicial);
    const columnaInicial = parseInt(fichaInterior.dataset.columnaInicial);
    
    // Simular el movimiento
    matrixTemp[fila][columna] = matrixTemp[filaInicial][columnaInicial];
    matrixTemp[filaInicial][columnaInicial] = '';
    
    // Verificar si el movimiento deja al rey en jaque
    const esBlanca = fichaInterior.classList.contains('blanca');
    const posicionRey = encontrarRey(esBlanca, matrixTemp);
    
    if (posicionRey && !esCasillaSeguraParaRey(posicionRey.fila, posicionRey.columna, esBlanca, matrixTemp)) {
        return false;
    }
    
    return true;
}

// Función para encontrar todos los movimientos posibles de una ficha
export const encontrarMovimientosPosibles = (fichaInterior, matrix) => {
    const movimientos = [];
    const figura = fichaInterior.textContent;
    const filaInicial = parseInt(fichaInterior.dataset.filaInicial);
    const columnaInicial = parseInt(fichaInterior.dataset.columnaInicial);
    const turnoBlanco = fichaInterior.classList.contains('blanca');
    
    // 
    
    const casillaTemp = {
        dataset: {
            fila: 0,
            columna: 0
        },
        querySelector: () => null
    };
    
    // Revisar todas las casillas del tablero
    for (let fila = 0; fila < 8; fila++) {
        for (let columna = 0; columna < 8; columna++) {
            if (fila === filaInicial && columna === columnaInicial) continue;
            
            casillaTemp.dataset.fila = fila;
            casillaTemp.dataset.columna = columna;
            
            // Verificar si el movimiento es válido según las reglas de cada pieza
            let movimientoValido = false;
            
            switch (figura) {
                case "♟": // Peón negro
                case "♙": // Peón blanco
                    movimientoValido = validarPeon(fichaInterior, filaInicial, columnaInicial, fila, columna, turnoBlanco, matrix);
                    break;
                case "♞": // Caballo negro
                case "♘": // Caballo blanco
                    movimientoValido = validarCaballo(fichaInterior, filaInicial, columnaInicial, fila, columna, matrix);
                    break;
                case "♝": // Alfil negro
                case "♗": // Alfil blanco
                    movimientoValido = validarAlfil(fichaInterior, filaInicial, columnaInicial, fila, columna, matrix);
                    break;
                case "♜": // Torre negra
                case "♖": // Torre blanca
                    movimientoValido = validarTorre(fichaInterior, filaInicial, columnaInicial, fila, columna, matrix);
                    break;
                case "♛": // Reina negra
                case "♕": // Reina blanca
                    movimientoValido = validarTorre(fichaInterior, filaInicial, columnaInicial, fila, columna, matrix) ||
                                     validarAlfil(fichaInterior, filaInicial, columnaInicial, fila, columna, matrix);
                    break;
                case "♚": // Rey negro
                case "♔": // Rey blanco
                    movimientoValido = validarRey(fichaInterior, filaInicial, columnaInicial, fila, columna, matrix);
                    break;
            }
            
            if (movimientoValido && probarMovimiento(fichaInterior, fila, columna, matrix)) {
                movimientos.push({
                    fila,
                    columna,
                    esCaptura: matrix[fila][columna] !== ''
                });
            }
        }
    }
    
    return movimientos;
}