// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let obtener = document.getElementById("obtener");

/* Si en el formulario se pulsa submit, se recoge la rima para buscar sus palabras relacionadas
    Se pone async y await para que espere a la respuesta de las funciones */
obtener.addEventListener('submit', async e => {
    e.preventDefault();

    let rimaConsultar = document.getElementById("rimaObte").value;
    let palabras = await obtenerPalabras(rimaConsultar);

    if(palabras){
        let palabrasMostrar = palabras.map(objeto => objeto.palabra).join(", ");
        console.log(palabras);
        info.innerText = "La rima " + rimaConsultar + " esta relacionada con las palabras:  " + palabrasMostrar;

        error.innerText = "";
    }    
});


// Usa la funcin de la API para buscar las palabras relacionadas con la rima indicada
async function getPalabras(rimaConsultar) {
    try {
        const resp = await fetch(`${SERVER}/rimas/rima/${rimaConsultar}`);
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`); 
        const json = await resp.json();
        console.log(json);
        let rimasGet = json.data;
        console.log(rimasGet);

        return rimasGet;
    } catch (error) {
        console.error("Fallo en la obtención de productos:", error);
    }
}

/* Comprueba que la rima sea valida, y si no recibe nada de la funcion, 
    sera porque la rima no esta almacenada, y lo indica */
async function obtenerPalabras(rimaConsultar){
    if(isNaN(rimaConsultar)){
        let rimasObt = getPalabras(rimaConsultar);

        info.innerText = "";
        error.innerText =  "La rima no esta en el diccionario";

        return rimasObt;
    }
    else{
        info.innerText = "";
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
