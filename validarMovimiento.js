import { matrix } from "./Matrix.js"; 

const hayPiezasEnElCamino = (filaInicial, columnaInicial, filaDestino, columnaDestino, matrix) => {
    const difFila = filaDestino - filaInicial;
    const difColumna = columnaDestino - columnaInicial;
    
    // Determinar la dirección del movimiento
    const pasoFila = difFila === 0 ? 0 : difFila / Math.abs(difFila);
    const pasoColumna = difColumna === 0 ? 0 : difColumna / Math.abs(difColumna);
    
    let filaActual = filaInicial + pasoFila;
    let columnaActual = columnaInicial + pasoColumna;
    
    // Verificar cada casilla en el camino
    while (filaActual !== filaDestino || columnaActual !== columnaDestino) {
        if (matrix[filaActual][columnaActual] !== '') {
            return true; // Hay una pieza en el camino
        }
        filaActual += pasoFila;
        columnaActual += pasoColumna;
    }
    
    return false;
}



const puedeCapturar = (fichaOrigen, casillaDestino) => {
    const piezaDestino = casillaDestino.querySelector('.ficha');
    if (!piezaDestino) return true; // No hay pieza para capturar
    
    return fichaOrigen.classList.contains('blanca') !== piezaDestino.classList.contains('blanca');
}


// Función que actualiza la matriz y el DOM después de un movimiento válido
export const realizarMovimiento = (fichaOrigen, casillaDestino, matrix) => {
    const filaOrigen = parseInt(fichaOrigen.dataset.filaInicial);
    const columnaOrigen = parseInt(fichaOrigen.dataset.columnaInicial);
    const filaDestino = parseInt(casillaDestino.dataset.fila);
    const columnaDestino = parseInt(casillaDestino.dataset.columna);
    
    // Actualizar la matriz
    matrix[filaDestino][columnaDestino] = matrix[filaOrigen][columnaOrigen];
    matrix[filaOrigen][columnaOrigen] = '';
    
    // Actualizar el DOM
    const piezaDestino = casillaDestino.querySelector('.ficha');
    if (piezaDestino) {
        casillaDestino.removeChild(piezaDestino); // Capturar pieza
    }
    
    const casillaOrigen = fichaOrigen.parentNode;
    casillaOrigen.removeChild(fichaOrigen);
    casillaDestino.appendChild(fichaOrigen);
    
    // Actualizar las coordenadas de la ficha
    fichaOrigen.dataset.filaInicial = filaDestino;
    fichaOrigen.dataset.columnaInicial = columnaDestino;
    
    return true;
}

// Función que valida el movimiento de las piezas
export const validarMovimientos = (fichaInterior,casilla) => {
    const figura = fichaInterior.textContent;
    const filaInicial = parseInt(fichaInterior.dataset.filaInicial);
    const columnaInicial = parseInt(fichaInterior.dataset.columnaInicial);
    const filaDestino = parseInt(casilla.dataset.fila);
    const columnaDestino = parseInt(casilla.dataset.columna);
    const turnoBlanco = fichaInterior.classList.contains('blanca');
    
    console.log(figura, filaInicial, columnaInicial, filaDestino, columnaDestino);
    switch (figura) {
        case "♟":
        case "♙": 
            return validarPeon(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, turnoBlanco);

        case "♞": 
        case "♘": 
            return validarCaballo(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino);

        case "♝": 
        case "♗": 
            return validarAlfil(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino);

        case "♜": 
        case "♖": 
            return validarTorre(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino);

        case "♛": 
        case "♕": 
            return validarReina(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino);

        case "♚": 
        case "♔": 
            return validarRey(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino);

        default:
            console.log('Pieza desconocida');
            return false;
    }
}

// Validación  para los peones
const validarPeon = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino, turnoBlanco, matrix) => {
    const direccion = turnoBlanco ? -1 : 1;
    
    // Movimiento hacia adelante
    if (columnaInicial === columnaDestino) {
        if (filaDestino === filaInicial + direccion && matrix[filaDestino][columnaDestino] === '') {
            return true;
        }
        // Movimiento inicial de 2 casillas
        if (((turnoBlanco && filaInicial === 6) || (!turnoBlanco && filaInicial === 1)) &&
            filaDestino === filaInicial + 2 * direccion && 
            matrix[filaDestino][columnaDestino] === '' &&
            matrix[filaInicial + direccion][columnaDestino] === '') {
            return true;
        }
    }
    
    // Captura en diagonal
    if (Math.abs(columnaDestino - columnaInicial) === 1 && filaDestino === filaInicial + direccion) {
        return matrix[filaDestino][columnaDestino] !== '';
    }
    
    return false;
}

// Validación para el Caballo
const validarCaballo = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino) => {
    const difFila = Math.abs(filaDestino - filaInicial);
    const difColumna = Math.abs(columnaDestino - columnaInicial);

    // El caballo se mueve en "L", es decir, 2 en una dirección y 1 en la otra
    if ((difFila === 2 && difColumna === 1) || (difFila === 1 && difColumna === 2)) {
        return true;
    }

    return false;
}

// Validación para el Alfil
const validarAlfil = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino) => {
    const difFila = Math.abs(filaDestino - filaInicial);
    const difColumna = Math.abs(columnaDestino - columnaInicial);

    // El alfil se mueve diagonalmente
    if (difFila === difColumna) {
        return true;
    }

    return false;
}

// Validación para la Torre
const validarTorre = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino) => {
    if (filaInicial === filaDestino || columnaInicial === columnaDestino) {
        return true; // Se mueve de forma recta, vertical u horizontal
    }
    return false;
}

// Validación para la Reina
const validarReina = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino) => {
    // La reina combina el movimiento de la torre y el alfil
    return validarTorre(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino) || 
           validarAlfil(fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino);
}

// Validación para el Rey
const validarRey = (fichaInterior, filaInicial, columnaInicial, filaDestino, columnaDestino) => {
    const difFila = Math.abs(filaDestino - filaInicial);
    const difColumna = Math.abs(columnaDestino - columnaInicial);

    // El rey puede moverse una casilla en cualquier dirección
    if (difFila <= 1 && difColumna <= 1) {
        return true;
    }

    return false;
}