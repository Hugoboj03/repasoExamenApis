"use strict"
let DiccionarioDeRimas = new Map();

let repetir = true;


let botonAgregar = document.getElementById("agregarRima");
let botonObtener = document.getElementById("obtenerRimas");
let botonEliminarRima = document.getElementById("eliminarRima");
let botonEliminarPalabra = document.getElementById("eliminarPalabra");
let botonVer = document.getElementById("verDiccionario");
let botonRimaRepetida = document.getElementById("rimaRepetida");
let contenedor = document.getElementById("contenedor");


//Agregar Palabra y Rima

botonAgregar.addEventListener("click", () => {

    /**
     * Cada listener lo primero que hara será limpiar el contenedor
     * para mostrar lo nuevo que se pulso
     */
    contenedor.innerHTML = "";

    let form = document.createElement("form");
    form.id = "formAgregarRima";

    let labelPalabra = document.createElement("label");
    labelPalabra.textContent = "Palabra: ";
    let inputPalabra = document.createElement("input");
    inputPalabra.type = "text";
    inputPalabra.name = "palabra";
    inputPalabra.id = "inputPalabra";


    let labelRima = document.createElement("label");
    labelRima.textContent = " Rima: ";
    let inputRima = document.createElement("input");
    inputRima.type = "text";
    inputRima.name = "rima";
    inputRima.id = "inputRima";


    let botonGuardar = document.createElement("button");
    botonGuardar.type = "submit";
    botonGuardar.textContent = "Guardar";

    botonGuardar.addEventListener("click", () => {
        let palabra = inputPalabra.value.trim();
        let rima = inputRima.value.trim();

        /**
         * Si hemos recibido una palabra y rima, y además
         * ninguna es un número, se ejecutara la función agregarRima
         */
        if (palabra && rima) {
            if (!isNaN(palabra) || !isNaN(rima)) {
                alert("No se puede ingresar un número en la palabra o la rima.");
            } else {
                agregarRima(DiccionarioDeRimas, palabra, rima);
                console.log(DiccionarioDeRimas);
                alert("La palabra y su rima se a introducido correctamente.");
                form.reset();
            }
        } else {
            alert("Por favor, ingrese una palabra y una rima.");
        }
    });

    /**
     * Con el appendChild vamos añadiendo todos los elementos al formulario
     */
    form.appendChild(labelPalabra);
    form.appendChild(inputPalabra);
    form.appendChild(labelRima);
    form.appendChild(inputRima);
    form.appendChild(botonGuardar);

    /**
     * Una vez ya añadidos los elementos al formulario, lo añadimos al contenedor
     */
    contenedor.appendChild(form);

});

//Obtener Rimas de una Palabra

botonObtener.addEventListener("click", () => {

    contenedor.innerHTML = "";

    let form = document.createElement("form");

    let labelPalabra = document.createElement("label");
    labelPalabra.textContent = "Palabra: ";
    let inputPalabra = document.createElement("input");
    inputPalabra.type = "text";
    inputPalabra.name = "palabra";


    let botonBuscar = document.createElement("button");
    botonBuscar.type = "button";
    botonBuscar.textContent = "Buscar";

    /**
     * Creamos un p y ponemos su texto vacio para rellenarlo mas abajo con todas las rimas
     */
    let rimasObtenidas = document.createElement("p");

    rimasObtenidas.textContent = "";

    botonBuscar.addEventListener("click", () => {
        let palabraConsultar = inputPalabra.value.trim();

        /**
         * Si no se introduce nada o se introduce un numero se advertira al usuario
         */
        if (palabraConsultar) {
            if (!isNaN(palabraConsultar)) {
                alert("No se puede ingresar un número en la palabra.");
            } else {
                let resultado = obtenerRima(DiccionarioDeRimas, palabraConsultar);
                if (Array.isArray(resultado)) {
                    rimasObtenidas.textContent = "Las rimas de " + palabraConsultar + " son: " + resultado.join(", ");
                } else {
                    rimasObtenidas.textContent = resultado; // Mensaje de error
                }
            }
        } else {
            alert("Por favor, ingrese una palabra.");
        }
    });

    form.appendChild(labelPalabra);
    form.appendChild(inputPalabra);
    form.appendChild(botonBuscar);

    contenedor.appendChild(form);
    contenedor.appendChild(rimasObtenidas);
});

//Eliminar Rima de una palabra

botonEliminarRima.addEventListener("click", () => {

    contenedor.innerHTML = "";

    let form = document.createElement("form");

    let labelPalabra = document.createElement("label");
    labelPalabra.textContent = "Palabra: ";
    let inputPalabra = document.createElement("input");
    inputPalabra.type = "text";
    inputPalabra.name = "palabra";
    inputPalabra.required = true;

    let labelRima = document.createElement("label");
    labelRima.textContent = " Rima: ";
    let inputRima = document.createElement("input");
    inputRima.type = "text";
    inputRima.name = "rima";
    inputRima.required = true;

    let botonEliminarRima = document.createElement("button");
    botonEliminarRima.type = "button";
    botonEliminarRima.textContent = "Eliminar Rima";

    botonEliminarRima.addEventListener("click", () => {
        let palabra = inputPalabra.value.trim();
        let rima = inputRima.value.trim();

        if (palabra && rima) {
            if (!isNaN(palabra) || !isNaN(rima)) {
                alert("No se puede ingresar un número en la palabra o la rima.");
            } else {
                let resultado = eliminarRima(DiccionarioDeRimas, palabra, rima);
                if(resultado){
                    alert("La rima se ha eliminado correctamente.");
                }else{
                    alert("No se ha encontrado la rima en la palabra.");
                }
                
                form.reset();
            }
        } else {
            alert("Por favor, ingrese una palabra y una rima.");
        }
    });

    form.appendChild(labelPalabra);
    form.appendChild(inputPalabra);
    form.appendChild(labelRima);
    form.appendChild(inputRima);
    form.appendChild(botonEliminarRima);

    contenedor.appendChild(form);

});

//Eliminar Palabra

botonEliminarPalabra.addEventListener("click", () => {

    contenedor.innerHTML = "";

    let form = document.createElement("form");

    let labelPalabra = document.createElement("label");
    labelPalabra.textContent = "Palabra: ";
    let inputPalabra = document.createElement("input");
    inputPalabra.type = "text";
    inputPalabra.name = "palabra";
    inputPalabra.required = true;


    let botonEliminarPalabra = document.createElement("button");
    botonEliminarPalabra.type = "button";
    botonEliminarPalabra.textContent = "Eliminar Palabra";

    botonEliminarPalabra.addEventListener("click", () => {
        let palabra = inputPalabra.value.trim();


        if (palabra) {
            if (!isNaN(palabra)) {
                alert("No se puede ingresar un número en la palabra.");
            } else {
                eliminarPalabra(DiccionarioDeRimas, palabra);
                console.log(DiccionarioDeRimas);
                alert("La palabra se a eliminado.");
                form.reset();
            }

        } else {
            alert("Por favor, ingrese una palabra.");
        }
    });

    form.appendChild(labelPalabra);
    form.appendChild(inputPalabra);
    form.appendChild(botonEliminarPalabra);

    contenedor.appendChild(form);

});

//Ver Diccionario

botonVer.addEventListener("click", () => {

    contenedor.innerHTML = "";

    // Crear tabla y encabezado
    let tabla = document.createElement("table");
    tabla.style.width = "100%";
    tabla.style.borderCollapse = "collapse";

    let encabezado = document.createElement("tr");

    let thPalabra = document.createElement("th");
    thPalabra.textContent = "Palabra";
    thPalabra.style.border = "1px solid black";


    let thRimas = document.createElement("th");
    thRimas.textContent = "Rimas";
    thRimas.style.border = "1px solid black";


    encabezado.appendChild(thPalabra);
    encabezado.appendChild(thRimas);
    tabla.appendChild(encabezado);

    // Añadir filas con palabras y rimas
    DiccionarioDeRimas.forEach((rimas, palabra) => {
        let fila = document.createElement("tr");

        let tdPalabra = document.createElement("td");
        tdPalabra.textContent = palabra;
        tdPalabra.style.border = "1px solid black";
        //Añadimos un poco de padding para que las palabras no estan tan juntas del borde de la tabla
        tdPalabra.style.padding = "8px";

        let tdRimas = document.createElement("td");
        tdRimas.textContent = rimas.join(", ");
        tdRimas.style.border = "1px solid black";
        //Añadimos un poco de padding para que las rimas no estan tan juntas del borde de la tabla
        tdRimas.style.padding = "8px";

        fila.appendChild(tdPalabra);
        fila.appendChild(tdRimas);
        tabla.appendChild(fila);
    });

    // Mostrar tabla en el contenedor
    contenedor.appendChild(tabla);

});

botonRimaRepetida.addEventListener("click", () => {

    contenedor.innerHTML = "";

    let form = document.createElement("form");

    let labelRima = document.createElement("label");
    labelRima.textContent = "Rima: ";
    let inputRima = document.createElement("input");
    inputRima.type = "text";
    inputRima.name = "rima";


    let botonBuscar = document.createElement("button");
    botonBuscar.type = "button";
    botonBuscar.textContent = "Buscar";

    /**
     * Creamos un p y ponemos su texto vacio para rellenarlo mas abajo con todas palabras
     */
    let palabrasObtenidas = document.createElement("p");

    palabrasObtenidas.textContent = "";

    botonBuscar.addEventListener("click", () => {
        let rimaConsultar = inputRima.value.trim();

        /**
         * Si no se introduce nada o se introduce un numero se advertira al usuario
         */
        if (rimaConsultar) {
            if (!isNaN(rimaConsultar)) {
                alert("No se puede ingresar un número en la rima.");
            } else {
                let palabras = rimasRepetidas(DiccionarioDeRimas, rimaConsultar);

                palabrasObtenidas.textContent =
                    "La rima '" + rimaConsultar + "' aparece en las palabras: " + palabras.join(", ");
            }
        } else {
            alert("Por favor, ingrese una palabra.");
        }
    });

    form.appendChild(labelRima);
    form.appendChild(inputRima);
    form.appendChild(botonBuscar);
    form.appendChild(palabrasObtenidas);


    contenedor.appendChild(form);



});
