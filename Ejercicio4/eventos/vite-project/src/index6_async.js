"use strict";

const SERVER = 'http://localhost:5001';
let eventos = [];

async function getEventos() {
  try {
      const resp = await fetch(`${SERVER}/eventos`); // promesa fetch
      
      if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`); 
      // JSON a Objeto
      const json = await resp.json(); // promesa .json()
      console.log(json);
      eventos = json.data;
      replaceEventos();
  } catch (error) {
      console.error("Fallo en la obtención de eventos:", error);
  }
}

async function replaceEventos() {
  let container = document.getElementById("eventsContainer");
  while(container.firstChild) {
      container.removeChild(container.firstChild);
  }
  eventos.forEach(p => {
      appendEvento(p, container);
  });

}

async function appendEvento(evento, contenedor) {
  
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


}

getEventos();
//document.addEventListener("DOMContentLoaded",);
