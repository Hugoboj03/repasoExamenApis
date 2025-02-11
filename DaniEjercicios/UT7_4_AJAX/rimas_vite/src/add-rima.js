// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let agregar = document.getElementById("agregar");

// Si en el formulario se pulsa submit, se recogen la palabra y la rima
agregar.addEventListener('submit', e => {
    e.preventDefault();

    let palabra = document.getElementById("palabra").value;
    let rima = document.getElementById("rima").value;
    agregarRima(palabra, rima);
});

// Recibe un array con los datos y los añade con POST
async function postEvento(diccionario) {
    try {
        const resp = await fetch(`${SERVER}/rimas`, {
            method: 'POST',
            body: JSON.stringify(diccionario),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);

        location.assign("index.html");
    } catch (error) {
        console.error("Fallo insertando el producto:", error);
    }
}

/* Se comprueba si las palabras son validas, y si lo son, 
    se introducen en un array y este se pasa a la funcion de POST */
function agregarRima(palabra, rima){
    
    if(isNaN(palabra) && isNaN(rima)){

        let subir = {palabra: document.getElementById("palabra").value,
            rima: document.getElementById("rima").value};

        postEvento(subir);
    }
    else{
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
