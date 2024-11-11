import {crearTablero} from "./CrearTablero.js"
import { reiniciarJuego } from "./reiniciarJuego.js"
import { matrix } from "./Matrix.js"
document.addEventListener('DOMContentLoaded',()=>{
    const turnoIndicator = document.createElement('div');
    turnoIndicator.id = 'turno-indicator';
    turnoIndicator.textContent = 'Turno: Blancas';
    const tablero =document.querySelector('#tablero')
    let turno=true
    tablero.setAttribute('turno',turno)
    crearTablero(tablero,turnoIndicator,matrix)
    document.body.insertBefore(turnoIndicator, tablero);
    
    

    // Agregar evento de clic para reiniciar el juego
    const reiniciarButton = document.createElement('button')
    reiniciarButton.textContent = 'Reiniciar'
    reiniciarButton.addEventListener('click', reiniciarJuego)
    document.body.appendChild(reiniciarButton)

})