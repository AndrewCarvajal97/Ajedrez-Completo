
import { crearFicha } from "./fichas.js"
import { validarMovimientos } from "./validarMovimiento.js"
import { limpiarMovimientosPosibles } from "./fichas.js"

export const crearTablero = (tablero,turnoIndicator,matrix) => {
    for(let fila = 0; fila < 8; fila++) {
        for (let columna = 0; columna < 8; columna++) {
            const casilla = document.createElement('div');
            casilla.classList.add('casilla');
            casilla.dataset.fila = fila;
            casilla.dataset.columna = columna;
            
            if((fila + columna) % 2 === 0) {
                casilla.classList.add('blancas');
            } else {
                casilla.classList.add('negras');
            }
            
            if(matrix[fila][columna]) {
                const ficha = crearFicha();
                if (fila < 2) {
                    ficha.classList.add('negra');
                } else if(fila > 5) {
                    ficha.classList.add('blanca');
                }
                ficha.textContent = matrix[fila][columna];
                ficha.dataset.filaInicial = fila;
                ficha.dataset.columnaInicial = columna;
                casilla.appendChild(ficha);
            }
            
            casilla.addEventListener('click', () => {
                const fichaInterior = casilla.querySelector('.ficha');
                const seleccionada = document.querySelector('.seleccionada');
                let turnoActual = tablero.getAttribute('turno') === 'true';
                
                if (seleccionada) {
                    if (validarMovimientos(seleccionada, casilla, matrix)) {
                        seleccionada.classList.remove('seleccionada');
                        turnoActual = !turnoActual;
                        tablero.setAttribute('turno', turnoActual);
                        turnoIndicator.textContent = `Turno: ${turnoActual ? 'Blancas' : 'Negras'}`;
                        limpiarMovimientosPosibles()
                    }
                }
            });
            
            tablero.appendChild(casilla);
        }
    }
}