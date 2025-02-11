"use strict";

// Edita sólo este fichero

document.getElementById("image").addEventListener("change", function (e) {
  //0.- Recuperar datos
  let file = document.getElementById("image").files[0];
  const reader = new FileReader();

  reader.addEventListener("load", (event) => {
    document.getElementById("imgPreview").src = reader.result;
  });

  reader.readAsDataURL(file);
});

document
  .getElementsByClassName("container")[0]
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let inputs = document.querySelectorAll(".container .form-control");
    let formularioValido = true;

    inputs.forEach((input) => {
      if (input.value === "") {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        formularioValido = false;
      } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
      }
    });

    if (formularioValido) {
      // Obtener los valores de los inputs
      console.log("Formulario válido");
      let fechaInput = document.getElementById("date").value;
      let fechaObj = new Date(fechaInput);
      let fechaFormateada = fechaObj.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const nuevoEvento = document.createElement("div");
      nuevoEvento.textContent =
        "Nombre: " +
        document.getElementById("name").value + " | " +
        "Fecha: " +
        fechaFormateada + " | " +
        "Descripción: " + 
        document.getElementById("description").value + " | " +
        "Precio: " +
        document.getElementById("price").value

      console.log(fechaFormateada);

      //Sacado de stackOverFlow: https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields
      e.target.reset();

      inputs.forEach((input) => {
        input.classList.remove("is-valid", "is-invalid");
      });

      /*let codigo =
      '<div class="card">' +
      '<img class="card-img-top" src="image_base64">' +
      '<div class="card-body">' +
      '<h4 class="card-titulo">Nombre del evento</h4>' +
      '<p class="card-text">Descripción.</p>' +
      "</div>" +
      '<div class="card-footer">' +
      '<small class="text-muted">';
    "dd/mm/yyyy" +
      '<span class="float-right">Precio ' +
      +"€</span>" +
      "</small>" +
      "</div>" +
      "</div>" +
      "</div>";
      **/

      let eventoDividido = nuevoEvento.textContent.split("|");

      // Añadir la tarjeta al contenedor de eventos
      let elemento = document.getElementById("eventsContainer");

      // Crear la tarjeta
      let card = document.createElement("div");
      card.className = "card";

      // Añadir la imagen a la tarjeta (esto debería ser en un evento de carga de imagen)
      let img = document.createElement("img");
      img.className = "card-img-top";
      img.src = document.getElementById("imgPreview").src;
      card.appendChild(img);

      // Añadir el cuerpo de la tarjeta (nombre del evento y descripción)
      let cardCuerpo = document.createElement("div");
      cardCuerpo.className = "card-body";

      let titulo = document.createElement("h4");
      titulo.className = "card-titulo";
      titulo.textContent = eventoDividido[0].trim();
      cardCuerpo.appendChild(titulo);

      let descripcion = document.createElement("p");
      descripcion.className = "card-text";
      descripcion.textContent = eventoDividido[2].trim();
      cardCuerpo.appendChild(descripcion);

      card.appendChild(cardCuerpo);

      // Añadir el pie de la tarjeta (fecha y precio)
      let cardFooter = document.createElement("div");
      cardFooter.className = "card-footer";

      let smallTexto = document.createElement("small");
      smallTexto.className = "text-muted";
      smallTexto.textContent = eventoDividido[1].trim();

      let priceSpan = document.createElement("span");
      priceSpan.className = "float-right";
      priceSpan.textContent = eventoDividido[3].trim();
      smallTexto.appendChild(priceSpan);

      cardFooter.appendChild(smallTexto);
      card.appendChild(cardFooter);

      // Añadir la tarjeta al contenedor
      elemento.appendChild(card);
      e.target.reset();
      inputs.forEach((input) => {
        input.classList.remove("is-valid", "is-invalid");
      });
      document.getElementById("imgPreview").src = "";

    }
  });
