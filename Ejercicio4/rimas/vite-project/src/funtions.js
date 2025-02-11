/**
 * Agregar Rima
 * @param {*} DiccionarioDeRimas 
 * @param {*} palabra 
 * @param {*} rima 
 * @returns 
 */
function agregarRima(DiccionarioDeRimas, palabra, rima) {

    //Concatenamos los nuevos items al array ya existente
    if (DiccionarioDeRimas.has(palabra)) {

        DiccionarioDeRimas.get(palabra).push(rima);

    } else {
        DiccionarioDeRimas.set(palabra, [rima]);
    }

    return DiccionarioDeRimas;

}

/**
 * Obtener Rima
 * @param {*} DiccionarioDeRimas 
 * @param {*} palabraConsultar 
 * @returns 
 */

function obtenerRima(DiccionarioDeRimas, palabraConsultar) {

    if (DiccionarioDeRimas.has(palabraConsultar)) {
        return DiccionarioDeRimas.get(palabraConsultar);
    } else {
        // Si no existe, devolvemos un mensaje de error
        return "La palabra" + palabraConsultar + " no se encuentra en el diccionario.";
    }

}


function eliminarRima(DiccionarioDeRimas, palabraClave, rima) {

    if (DiccionarioDeRimas.has(palabraClave)) {
        // Obtenemos la lista de rimas de la palabra
        const rimas = DiccionarioDeRimas.get(palabraClave);
        const index = rimas.indexOf(rima);

        // Si la rima existe en la lista, la eliminamos
        if (index !== -1) {
            rimas.splice(index, 1); // Eliminamos la rima

            // Si la lista de rimas queda vacía, eliminamos la palabra del diccionario
            if (rimas.length === 0) {
                DiccionarioDeRimas.delete(palabraClave);
            } else {
                DiccionarioDeRimas.set(palabraClave, rimas); // Actualizamos el diccionario
            }
            return true;
        }
    }
    return false;

}

/**
 * Eliminar palabra
 * @param {*} DiccionarioDeRimas 
 * @param {*} palabra 
 * @returns 
 */
function eliminarPalabra(DiccionarioDeRimas, palabra) {

    if (DiccionarioDeRimas.has(palabra)) {

        return DiccionarioDeRimas.delete(palabra);

    } else {
        console.log("Est palabra no existe en el diccionatio");
    }


}

function rimasRepetidas(DiccionarioDeRimas, rima) {

    let palabras = [];

    DiccionarioDeRimas.forEach((rimas, palabra) => {
        if (rimas.includes(rima)) {
            palabras.push(palabra);
        }
    });

    return palabras;
}

