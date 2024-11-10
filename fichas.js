export const crearFicha=()=>{
    const ficha=document.createElement('div')
    ficha.classList.add('ficha')
    ficha.addEventListener('click',()=>{
       const fichaSeleccionada = seleccionarFicha(ficha)
    })
    return ficha
}

const seleccionarFicha=(ficha)=>{
    const tablero=document.querySelector('#tablero')
    const turno =tablero.getAttribute('turno')
    const SeleccionAnterior=document.querySelector('.seleccionada')
    const clase=ficha.getAttribute('class')
    let [clase1, clase2]=clase.split(" ")
    console.log(turno)
    if( clase2==="blanca" && turno==="true"){
        if(SeleccionAnterior){
            SeleccionAnterior.classList.remove('seleccionada')
        }
        ficha.classList.add('seleccionada')
        return ficha
    }
    else if( clase2==="negra" && turno==="false"){
        if(SeleccionAnterior){
            SeleccionAnterior.classList.remove('seleccionada')
        }
        ficha.classList.add('seleccionada')
        return ficha
    } 
   return
}