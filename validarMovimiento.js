
import { puedeCapturar } from "./ValidarComerFicha.js";
import { validarPeon } from "./MovimientosPeon.js";
import { validarAlfil } from "./MovimientosAlfil.js";
import { validarTorre } from "./MovimientosTorre.js";
import { validarCaballo } from "./MovimientosCaballo.js";
import { posicionValida } from "./validarPosicionValida.js";
import { validarRey } from "./MovimientosRey.js";
import { realizarMovimiento } from "./ActualizarDOM.js";


// Función principal de validación
export const validarMovimientos = (fichaInterior, casilla, matrix) => {
    const figura = fichaInterior.textContent;
    const filaInicial = parseInt(fichaInterior.dataset.filaInicial);
    const columnaInicial = parseInt(fichaInterior.dataset.columnaInicial);
    const filaDestino = parseInt(casilla.dataset.fila);
    const columnaDestino = parseInt(casilla.dataset.columna);
    const turnoBlanco = fichaInterior.classList.contains('blanca');
    
  // Verificar que la posición destino esté dentro del tablero
  if (!posicionValida(filaDestino, columnaDestino)) {
    return false;
}

// Verificar si se puede capturar la pieza destino
if (!puedeCapturar(fichaInterior, casilla)) {
    return false;
}

let movimientoValido = false;

switch (figura) {
    case "♟": // Peón negro
    case "♙": // Peón blanco
        movimientoValido = validarPeon(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, turnoBlanco, matrix);
        break;
        
    case "♞": // Caballo negro
    case "♘": // Caballo blanco
        movimientoValido = validarCaballo(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix);
        break;
        
    case "♝": // Alfil negro
    case "♗": // Alfil blanco
        movimientoValido = validarAlfil(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix);
        break;
        
    case "♜": // Torre negra
    case "♖": // Torre blanca
        movimientoValido = validarTorre(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix);
        break;
        
    case "♛": // Reina negra
    case "♕": // Reina blanca
        movimientoValido = validarTorre(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix) ||
                          validarAlfil(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix);
        break;
        
    case "♚": // Rey negro
    case "♔": // Rey blanco
        movimientoValido = validarRey(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, matrix);
        break;
}

if (movimientoValido) {
    return realizarMovimiento(fichaInterior, casilla, matrix);
}

return false;
}




