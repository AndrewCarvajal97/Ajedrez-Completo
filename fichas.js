import { encontrarMovimientosPosibles } from "./PosiblesMovimientos.js"
import { matrix } from "./Matrix.js"


export const crearFicha=()=>{
    const ficha=document.createElement('div')
    ficha.classList.add('ficha')
    ficha.addEventListener('click',()=>{
       const fichaSeleccionada = seleccionarFicha(ficha)
    })
    return ficha
}

// Función para mostrar los movimientos posibles en el tablero
const mostrarMovimientosPosibles = (movimientos) => {
    limpiarMovimientosPosibles();
    
    movimientos.forEach(({fila, columna, esCaptura}) => {
        const casilla = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
        casilla.classList.add(esCaptura ? 'movimiento-captura' : 'movimiento-posible');
    });
}

// Función para limpiar los indicadores de movimientos posibles
export const limpiarMovimientosPosibles = () => {
    document.querySelectorAll('.movimiento-posible, .movimiento-captura').forEach(casilla => {
        casilla.classList.remove('movimiento-posible', 'movimiento-captura');
    });
}

// Función modificada de selección de ficha
const seleccionarFicha = (ficha) => {
    const tablero = document.querySelector('#tablero');
    const turno = tablero.getAttribute('turno');
    const seleccionAnterior = document.querySelector('.seleccionada');
    const clase = ficha.getAttribute('class');
    let [clase1, clase2] = clase.split(" ");
    
    // Limpiar movimientos posibles anteriores
    limpiarMovimientosPosibles();
    
    if (clase2 === "blanca" && turno === "true") {
        if (seleccionAnterior) {
            seleccionAnterior.classList.remove('seleccionada');
        }
        ficha.classList.add('seleccionada');
        
        // Mostrar movimientos posibles
        const movimientosPosibles = encontrarMovimientosPosibles(ficha, matrix);
        mostrarMovimientosPosibles(movimientosPosibles);
        
        return ficha;
    }
    else if (clase2 === "negra" && turno === "false") {
        if (seleccionAnterior) {
            seleccionAnterior.classList.remove('seleccionada');
        }
        ficha.classList.add('seleccionada');
        
        // Mostrar movimientos posibles
        const movimientosPosibles = encontrarMovimientosPosibles(ficha, matrix);
        mostrarMovimientosPosibles(movimientosPosibles);
        
        return ficha;
    }
    return null;
}

// Modificar la función de click en casilla para limpiar los indicadores cuando se realiza un movimiento
const clickCasilla = (casilla, tablero) => {
    const fichaInterior = casilla.querySelector('.ficha');
    const seleccionada = document.querySelector('.seleccionada');
    let turnoActual = tablero.getAttribute('turno') === 'true';
    
    if (seleccionada) {
        if (validarMovimientos(seleccionada, casilla, matrix)) {
            seleccionada.classList.remove('seleccionada');
            limpiarMovimientosPosibles();
            turnoActual = !turnoActual;
            tablero.setAttribute('turno', turnoActual);
            document.querySelector('#turno-indicator').textContent = 
                `Turno: ${turnoActual ? 'Blancas' : 'Negras'}`;
        }
    }
}