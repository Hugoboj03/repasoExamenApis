// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let obtener = document.getElementById("obtener");

/* Si en el formulario se pulsa submit, se recogen la palabra a eliminar
    Se pone async y await para que espere a la respuesta de las funciones */
obtener.addEventListener('submit', async e => {
    e.preventDefault();

    let palabraEliminar = document.getElementById("palabraObte").value;
    let eliminada = await obtenerRimas(palabraEliminar);

    if(eliminada){
        console.log(eliminada);
        info.innerText = "La palabra " + palabraEliminar + " se ha elimiando";

        error.innerText = "";
    }    
});

// Usa la funcin de la API de elimnar palabra enviandole la palabra indicada
async function deletePalabra(palabraEliminar) {
    try {
        const resp = await fetch(`${SERVER}/rimas/palabra/${palabraEliminar}`, {
            method: 'DELETE'
        });
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        if(resp.status == 200) {
            return true;
        }
    } catch (error) {
        console.error("Fallo insertando el producto:", error);
    }
}

/* Comprueba que la palabra sea valida, y si no recibe nada de la funcion de eliminar, 
    sera porque la palabra no esta almacenada, y lo indica */
async function obtenerRimas(palabraEliminar){
    if(isNaN(palabraEliminar)){
        let eliminada = deletePalabra(palabraEliminar);

        info.innerText = "";
        error.innerText =  "La palabra no esta en el diccionario";

        return eliminada;
    }
    else{
        info.innerText = "";
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
