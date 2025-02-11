"use strict";
const SERVER = 'http://localhost:3000';

let eventos = [];

function getEventos() {
  // 1. Creamos la instancia del objeto
  const xhr = new XMLHttpRequest();
  // 2. Establecemos la comunicación con el servidor 
  //    Método GET:
  xhr.open('GET', `${SERVER}/eventos`, true);
  // 3. Enviamos la petición al servidor
  xhr.send();
  // 4. Ponemos una escucha al objeto
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              const json = JSON.parse(xhr.responseText); // JSON a Objeto -- CALLBACK
              console.log(json);
              eventos = json.data;
              replaceEventos();
          } else {
              console.error("Fallo en la obtención de eventos:", xhr.statusText);
          }
      }
  };
}

function replaceEventos() {
  let container = document.getElementById("eventoContainer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  eventos.forEach(p => {
    appendEventos(p, container);
  });

}

function appendEventos(evento, container) {
  // Crear la tarjeta principal
  let eventoCard = document.createElement("div");
  eventoCard.className = "card mb-4";

  // Añadir la imagen a la tarjeta (si existe)
  let imgElement = document.createElement("img");
    imgElement.className = "card-img-top";
    imgElement.src = evento.imgPreview;

  eventoCard.appendChild(imgElement);

  // Crear el cuerpo de la tarjeta
  let cardCuerpo = document.createElement("div");
  cardCuerpo.className = "card-body";

  // Título del evento
  let titulo = document.createElement("h4");
  titulo.className = "card-title";
  titulo.textContent = evento.name; // Nombre del evento
  cardCuerpo.appendChild(titulo);

  // Descripción del evento
  let descripcion = document.createElement("p");
  descripcion.className = "card-text";
  descripcion.textContent = evento.description || "Sin descripción disponible.";
  cardCuerpo.appendChild(descripcion);

  eventoCard.appendChild(cardCuerpo);

  // Crear el pie de la tarjeta (fecha y precio)
  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-between align-items-center";

  // Fecha del evento
  let fecha = document.createElement("small");
  fecha.className = "text-muted";
  fecha.textContent = `Fecha: ${evento.date || "No especificada"}`;
  cardFooter.appendChild(fecha);

  // Precio del evento
  let precio = document.createElement("span");
  precio.className = "text-success font-weight-bold";
  precio.textContent = `${evento.price ? `${evento.price} €` : "Gratis"}`;
  cardFooter.appendChild(precio);

  eventoCard.appendChild(cardFooter);

  // Añadir la tarjeta al contenedor
  container.appendChild(eventoCard);
}

getEventos();

