"use strict";

const SERVER = 'http://localhost:5001';
let eventos = [];

function getEventos() {
  fetch(`${SERVER}/eventos`)
    .then(resp => {
      // si el status no está entre 200 y 299, se produce error
      if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
      return resp.json(); // convierte JSON a Objeto
    })
    .then(json => {
      console.log(json);
      productos = json.data;
      replaceEventos();
    })
    .catch(error => {
      console.error("Fallo en la obtención de eventos:", error);
    });
}

// Insertar producto con Fetch


/** 
function postEvento(evento) {
  // Fetch con segundo parámetro con la información
  fetch(`${SERVER}/eventos`, {
    method: 'POST', // Método
    body: JSON.stringify(evento), // pasamos producto de Objeto a JSON en el body
    headers: { // Indicamos encabezados
      'Content-Type': 'application/json'
    }
  })
    .then(resp => {
      // si el status no está entre 200 y 299, se produce error
      if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
      if (resp.status !== 204) { // Si la respuesta tiene contenido: 204 No Content
        resp.json() // convierte JSON a Objeto
          .then(json => {
            productos.push(json.data);
            replaceEventos();
          });
        document.getElementById("preview").src = "";
        let form = document.getElementById("addProducto");
        form.reset();
      }
    })
    .catch(error => {
      console.error("Fallo insertando el evento:", error);
    });
}

/**
 * Gestión DOM
 */
function replaceProductos() {
  let container = document.getElementById("eventsContainer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  eventos.forEach(p => {
    appendEvento(p, container);
  });

}

function appendProducto(eventos, contenedor) {

  const contenedor = document.getElementById("eventsContainer");
  contenedor.innerHTML = "";

  eventos.forEach((evento) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card mb-3";

    const img = document.createElement("img");
    img.src = evento.image;
    img.className = "card-img-top";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h4");
    titulo.className = "card-title";
    titulo.textContent = evento.name;

    const descripcion = document.createElement("p");
    descripcion.className = "card-text";
    descripcion.textContent = evento.description;

    const pie = document.createElement("div");
    pie.className = "card-footer";

    const fecha = document.createElement("small");
    fecha.className = "text-muted";
    fecha.textContent = new Date(evento.date).toLocaleDateString();

    const precio = document.createElement("span");
    precio.className = "float-right";
    precio.textContent = `${evento.price} €`;

    pie.appendChild(fecha);
    pie.appendChild(precio);
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(descripcion);
    tarjeta.appendChild(img);
    tarjeta.appendChild(cuerpo);
    tarjeta.appendChild(pie);

    contenedor.appendChild(tarjeta);
  });


}


/** 

function cargarEventos() {
  fetch("http://localhost:3000/eventos")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los eventos del servidor.");
      }
      return response.json();
    })
    .then((eventos) => {
      const contenedor = document.getElementById("eventsContainer");
      contenedor.innerHTML = "";

      eventos.forEach((evento) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "card mb-3";

        const img = document.createElement("img");
        img.src = evento.image;
        img.className = "card-img-top";

        const cuerpo = document.createElement("div");
        cuerpo.className = "card-body";

        const titulo = document.createElement("h4");
        titulo.className = "card-title";
        titulo.textContent = evento.name;

        const descripcion = document.createElement("p");
        descripcion.className = "card-text";
        descripcion.textContent = evento.description;

        const pie = document.createElement("div");
        pie.className = "card-footer";

        const fecha = document.createElement("small");
        fecha.className = "text-muted";
        fecha.textContent = new Date(evento.date).toLocaleDateString();

        const precio = document.createElement("span");
        precio.className = "float-right";
        precio.textContent = `${evento.price} €`;

        pie.appendChild(fecha);
        pie.appendChild(precio);
        cuerpo.appendChild(titulo);
        cuerpo.appendChild(descripcion);
        tarjeta.appendChild(img);
        tarjeta.appendChild(cuerpo);
        tarjeta.appendChild(pie);

        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los eventos:", error);
      alert("Hubo un error al cargar los eventos. Por favor, inténtalo más tarde.");
    });
}

*/

//document.addEventListener("DOMContentLoaded", cargarEventos);

getEventos();
