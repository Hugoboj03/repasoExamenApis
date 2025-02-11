"use strict";

document.getElementById("newEvent").addEventListener("submit", async function (event) {
    event.preventDefault();  // Evita el comportamiento por defecto del formulario.

    // Obtener los valores del formulario
    let nombre = document.getElementById("name").value;
    let fecha = document.getElementById("date").value;
    let descripcion = document.getElementById("description").value;
    let precio = document.getElementById("price").value;
    let imagen = document.getElementById("image").files[0];

    if (!nombre || !fecha || !descripcion || !precio || !imagen) {
        alert("Todos los campos son obligatorios");
        return;
    }

    console.log("Documento");
    
    let reader = new FileReader();

    // Usamos la función asíncrona dentro del onload
    reader.onload = function (e) {
        (async function() {
            const evento = {
                name: nombre,
                date: fecha,
                description: descripcion,
                price: precio,
                image: e.target.result,  // La imagen en base64
            };

            console.log(evento);

            try {
                // Aquí usamos 'await' para esperar la respuesta de la petición fetch
                const response = await fetch("http://localhost:5001/eventos", {
                    method: "POST",
                    body: JSON.stringify(evento),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    location.assign("../index.html");  // Redirige al index si todo va bien
                } else {
                    alert("Error al crear el evento");
                }
            } catch (error) {
                console.error(error);
                alert("Error al crear el evento");
            }
        })();  // Ejecutamos la función anónima asíncrona inmediatamente
    };

    // Empieza la lectura del archivo como base64
    reader.readAsDataURL(imagen);
});

document.getElementById("image").addEventListener("change", (event) => {
    const file = event.target.files[0];
    let reader = new FileReader();

    reader.addEventListener("load", () => {
        document.getElementById("imgPreview").src = reader.result;
    });
    reader.readAsDataURL(file);
});