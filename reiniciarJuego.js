// Archivo: reiniciarJuego.js

import { crearTablero } from "./CrearTablero.js";
import {matrixReinicio } from "./Matrix.js";
import { limpiarMovimientosPosibles } from "./fichas.js";

export const reiniciarJuego = () => {
    // Limpiar el tablero y volver a crear las fichas
    const tablero = document.querySelector('#tablero');
    tablero.innerHTML = '';
    const turnoIndicator = document.createElement('div');
    turnoIndicator.id = 'turno-indicator';
    turnoIndicator.textContent = 'Turno: Blancas';
    let turno=true
    tablero.setAttribute('turno',turno)
    crearTablero(tablero,turnoIndicator,matrixReinicio)
    document.body.insertBefore(turnoIndicator, tablero);

   

    // Limpiar los indicadores de movimientos posibles y selección
    limpiarMovimientosPosibles();
    document.querySelectorAll('.seleccionada').forEach(ficha => {
        ficha.classList.remove('seleccionada');
    });
};