"use strict";

const SERVER = 'http://localhost:3000'; // URL del backend, si es necesario
let DiccionarioDeRimas = new Map(); // Estructura para almacenar las rimas


async function getRimas() {
    try {
        const resp = await fetch(`${SERVER}/diccionario`);
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        const json = await resp.json();
        console.log(json);

        DiccionarioDeRimas = new Map(Object.entries(json.data)); // Convertir objeto a Map
        replaceRimas();
    } catch (error) {
        console.error("Error al obtener rimas del servidor:", error);
    }
}


function replaceRimas() {
    const contenedor = document.getElementById("contenedor");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

    DiccionarioDeRimas.forEach((rimas, palabra) => {
        appendPalabraRimas(palabra, rimas, contenedor);
    });
}

// Añadir una palabra y sus rimas al contenedor
function appendPalabraRimas(palabra, rimas, contenedor) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card mb-3";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h4");
    titulo.className = "card-title";
    titulo.textContent = palabra;

    const listaRimas = document.createElement("ul");
    listaRimas.className = "list-group list-group-flush";

    rimas.forEach(rima => {
        const item = document.createElement("li");
        item.className = "list-group-item";
        item.textContent = rima;
        listaRimas.appendChild(item);
    });

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(listaRimas);
    tarjeta.appendChild(cuerpo);
    contenedor.appendChild(tarjeta);
}

getRimas();

