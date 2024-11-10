// Función para verificar si se puede capturar la pieza destino
export const puedeCapturar = (fichaOrigen, casillaDestino) => {
    const piezaDestino = casillaDestino.querySelector('.ficha');
    if (!piezaDestino) return true; // No hay pieza para capturar
    
    return fichaOrigen.classList.contains('blanca') !== piezaDestino.classList.contains('blanca');
}