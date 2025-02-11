// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let obtener = document.getElementById("obtener");

/* Si en el formulario se pulsa submit, se recogen la palabra para buscar sus rimas
    Se pone async y await para que espere a la respuesta de las funciones */
obtener.addEventListener('submit', async e => {
    e.preventDefault();

    let palabraConsultar = document.getElementById("palabraObte").value;
    let rimas = await obtenerRimas(palabraConsultar);

    if(rimas){
        let rimasMostrar = rimas.map(objeto => objeto.rima).join(", ");
        console.log(rimas);
        info.innerText = "La palabra " + palabraConsultar + " tiene como rimas:  " + rimasMostrar;
    
        error.innerText = "";
    }
    
});

// Usa la funcin de la API para buscar las rimas asociadas con la palabra indicada
async function getRimas(palabraConsultar) {
    try {
        const resp = await fetch(`${SERVER}/rimas/palabra/${palabraConsultar}`);
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

/* Comprueba que la palabra sea valida, y si no recibe nada de la funcion, 
    sera porque la palabra no esta almacenada, y lo indica */
async function obtenerRimas(palabraConsultar){
    if(isNaN(palabraConsultar)){
        let rimasObt = getRimas(palabraConsultar);

        info.innerText = "";
        error.innerText =  "La palabra no esta en el diccionario";

        return rimasObt;
    }
    else{
        info.innerText = "";
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
