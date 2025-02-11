// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let obtener = document.getElementById("obtener");

/* Si en el formulario se pulsa submit, se recogen la rima a eliminar 
    y la palabra que la contiene
    Se pone async y await para que espere a la respuesta de las funciones */
obtener.addEventListener('submit', async e => {
    e.preventDefault();

    let palabraEliminar = document.getElementById("palabraObte").value;
    let rimaEliminar = document.getElementById("rimaObte").value;
    let eliminada = await obtenerRimas(palabraEliminar, rimaEliminar);

    if(eliminada){
        console.log(eliminada);
        info.innerText = "La rima " + rimaEliminar + " se ha elimiando de la palabra " + palabraEliminar;

        error.innerText = "";
    }    
});

// Usa la funcin de la API de elimnar palabra enviandole la rima en la palabra indicada
async function deletePalabra(palabraEliminar, rimaEliminar) {
    try {
        const resp = await fetch(`${SERVER}/rimas/rima/${palabraEliminar}/${rimaEliminar}`, {
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

/* Comprueba que la rima y la palabra sean validas, y si no recibe nada de la funcion de eliminar, 
    sera porque la rima o la palabra no estan almacenadas, y lo indica */
async function obtenerRimas(palabraEliminar, rimaEliminar){
    if(isNaN(palabraEliminar) || isNaN(rimaEliminar)){
        let eliminada = deletePalabra(palabraEliminar, rimaEliminar);

        info.innerText = "";
        error.innerText =  "Alguna de las palabras no esta en el diccionario";

        return eliminada;
    }
    else{
        info.innerText = "";
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
