"use strict";

document.getElementById("agregarRima").addEventListener("click", function () {


    const contenedor = document.getElementById("contenedor");

    // Limpiar contenedor y configurar formulario
    contenedor.innerHTML = "";

    let form = document.createElement("form");
    form.id = "formAgregarRima";

    let labelPalabra = document.createElement("label");
    labelPalabra.textContent = "Palabra: ";
    let inputPalabra = document.createElement("input");
    inputPalabra.type = "text";
    inputPalabra.id = "inputPalabra";
    inputPalabra.name = "palabra";

    let labelRima = document.createElement("label");
    labelRima.textContent = "Rima: ";
    let inputRima = document.createElement("input");
    inputRima.type = "text";
    inputRima.id = "inputRima";
    inputRima.name = "rima";

    let botonGuardar = document.createElement("button");
    botonGuardar.type = "submit";
    botonGuardar.textContent = "Guardar";

    form.appendChild(labelPalabra);
    form.appendChild(inputPalabra);
    form.appendChild(labelRima);
    form.appendChild(inputRima);
    form.appendChild(botonGuardar);

    contenedor.appendChild(form);





    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario.

        const palabra = inputPalabra.value.trim();
        const rima = inputRima.value.trim();

        // Validaciones
        if (!palabra || !rima) {
            alert("Ingrese una palabra y una rima.");
            return;
        }

        if (!isNaN(palabra) || !isNaN(rima)) {
            alert("No se pueden ingresar números en la palabra o la rima.");
            return;
        }

        // Actualizar el diccionario de rimas
        if (!DiccionarioDeRimas.has(palabra)) {
            DiccionarioDeRimas.set(palabra, []);
        }

        DiccionarioDeRimas.get(palabra).push(rima);
        alert(`Se ha añadido la rima "${rima}" a la palabra "${palabra}".`);

        console.log(DiccionarioDeRimas);

        // Enviar los datos
        try {
            const response = await fetch("http://localhost:3000/diccionario", {
                method: "POST",
                body: JSON.stringify({ palabra, rima }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("La palabra y su rima a sido agregada correctamente");
            } else {
                alert("Error al agregar la palabra con su rima");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("No se pudo conectar con el servidor.");
        }
        // Limpiar el formulario
        form.reset();
    });
});

document.getElementById("eliminarPalabra").addEventListener("click", function () {

    const contenedor = document.getElementById("contenedor");
    // Limpiar contenedor y configurar formulario
    contenedor.innerHTML = "";
    let form = document.createElement("form");
    form.id = "formEliminarRima";
    let labelPalabra = document.createElement("label");
    labelPalabra.textContent = "Palabra: ";
    let inputPalabra = document.createElement("input");
    inputPalabra.type = "text";
    inputPalabra.id = "inputPalabra";
    inputPalabra.name = "palabra";
    let botonEliminar = document.createElement("button");
    botonEliminar.type = "submit";
    botonEliminar.textContent = "Eliminar";
    form.appendChild(labelPalabra);
    form.appendChild(inputPalabra);
    form.appendChild(botonEliminar);
    contenedor.appendChild(form);
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar comportamiento por defecto
        const palabra = inputPalabra.value.trim();
        if (!palabra) {
            alert("Deme una palabra.");
            return;
        }
        
        if (!DiccionarioDeRimas.has(palabra)) {
            alert("La palabra no existe en el diccionario.");
            return;
        }
        // Enviar los datos
        try {
            let ruta = "http://localhost:3000/diccionario/palabra/" + palabra;
            const response = await fetch(ruta, {
                method: "DELETE",
                body: JSON.stringify({ palabra }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                alert("La palabra se ha eliminado correctamente.");
                DiccionarioDeRimas.delete(palabra);
                console.log(DiccionarioDeRimas); 
            } else {
                alert("No se pudo eliminar la palabra");

            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });



});

document.getElementById("eliminarRima").addEventListener("click", function () {
    const contenedor = document.getElementById("contenedor");
    // Limpiar contenedor y configurar formulario
    contenedor.innerHTML = "";

    let form = document.createElement("form");
    form.id = "formEliminarRima";

    let labelPalabra = document.createElement("label");
    labelPalabra.textContent = "Palabra: ";
    let inputPalabra = document.createElement("input");
    inputPalabra.type = "text";
    inputPalabra.id = "inputPalabra";
    inputPalabra.name = "palabra";

    let labelRima = document.createElement("label");
    labelRima.textContent = "Rima: ";
    let inputRima = document.createElement("input");
    inputRima.type = "text";
    inputRima.id = "inputRima";
    inputRima.name = "rima";

    let botonEliminar = document.createElement("button");
    botonEliminar.type = "submit";
    botonEliminar.textContent = "Eliminar";

    form.appendChild(labelPalabra);
    form.appendChild(inputPalabra);
    form.appendChild(labelRima);
    form.appendChild(inputRima);
    form.appendChild(botonEliminar);
    contenedor.appendChild(form);

    
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar comportamiento por defecto

        const palabra = inputPalabra.value.trim();
        const rima = inputRima.value.trim();

        // Validaciones
        if (!palabra || !rima) {
            alert("Deme una palabra y una rima.");
            return;
        }

        if (!DiccionarioDeRimas.has(palabra)) {
            alert("La palabra no existe en el diccionario.");
            return;
        }

        if (!DiccionarioDeRimas.get(palabra).includes(rima)) {
            alert("Esta rima no la tiene ninguna palabra.");
            return;
        }

        // Enviar la solicitud a la api
        try {
            let ruta = `http://localhost:3000/diccionario/rima/${palabra}/${rima}`;
            const response = await fetch(ruta, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert(`La rima "${rima}" ha sido eliminada correctamente de la palabra "${palabra}".`);

                // Eliminar la rima en el frontend
                DiccionarioDeRimas.set(palabra, DiccionarioDeRimas.get(palabra).filter(r => r !== rima));

                // Si la palabra ya no tiene más rimas, eliminarla del diccionario
                if (DiccionarioDeRimas.get(palabra).length === 0) {
                    DiccionarioDeRimas.delete(palabra);
                }

                console.log(DiccionarioDeRimas); // Verificar en consola
            } else {
                alert("Error al eliminar la rima en la api.");
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("No se pudo conectar con el servidor.");
        }

        form.reset(); // Limpiar el formulario
    });
});