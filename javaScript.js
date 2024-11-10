import {crearTablero} from "./CrearTablero.js"

document.addEventListener('DOMContentLoaded',()=>{
    const tablero =document.querySelector('#tablero')
    let turno=true
    tablero.setAttribute('turno',turno)
    crearTablero(tablero)

})