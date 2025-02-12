"use strict";

let formulario = document.getElementById("newEvent");
let nombre = document.getElementById("name");
let fecha = document.getElementById("date");
let description = document.getElementById("description");
let precio = document.getElementById("price");
let imagen = document.getElementById("image");
let container = document.getElementById("eventsContainer");

imagen.addEventListener("change", e => {

    let archivo = imagen.files[0];

    const reader = new FileReader();

    reader.addEventListener("load", e => {

        document.getElementById("imagePreview").src = event.target.result;


    });

    reader.readAsDataURL(archivo);

});

formulario.addEventListener("submit", e => {

    e.preventDefault();

    let validos = 0;

    if (nombre.value == "") {
        nombre.classList.add("is-invalid");
        e.preventDefault();
    } else {
        nombre.classList.add("is-valid");
        validos++;
    }

    if (fecha.value == "") {
        fecha.classList.add("is-invalid");
        e.preventDefault();
    } else {
        fecha.classList.add("is-valid");
        validos++;
    }

    if (description.value == "") {
        description.classList.add("is-invalid");
        e.preventDefault();
    } else {
        description.classList.add("is-valid");
        validos++;
    }

    if (precio.value == "") {
        precio.classList.add("is-invalid");
        e.preventDefault();
    } else {
        precio.classList.add("is-valid");
        validos++;
    }

    if (imagen.value == "") {
        imagen.classList.add("is-invalid");
        e.preventDefault();
    } else {
        imagen.classList.add("is-valid");
        validos++;
    }

    if (validos == 5) {

        const SERVER = "http://localhost:5001";

        let subir = {
            nombre: document.getElementById("name").value,
            fecha: document.getElementById("date").value,
            descripcion: document.getElementById("description").value,
            precio: document.getElementById("price").value,
            imagen: document.getElementById("imgPreview").src
        };

        async function postEvento(evento) {
            try {

                const resp = await fetch(`${SERVER}/eventos`, {
                    method: 'POST',
                    body: JSON.stringify(evento),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!resp.ok) {
                    throw new Error(`Error: ${resp.status} ${resp.statusText}`);
                }

                location.assign("index.html");

            } catch {
                console.log("Error al subir evento");
            }
        }

        postEvento(subir);

        document.getElementById("imgPreview").src = "";

        let inputs = [nombre, fecha, description, precio, imagen];

        inputs.forEach(element => {
            element.classList.value = "form-control";
        });

        formulario.reset();
    }

});