const SERVER = "http://localhost:3000";

/**
 * Ejemplo de petición FETCH gestionando las promesas con async/await
 */

/**
 * La API Fetch permite realizar una petición Ajax genérica que directamente devuelve una promesa.
 * Encapsula en una función --fetch-- todo el código que se repite siempre en una petición AJAX:
 *      - crear la petición, hacer el open, el send, escuchar los eventos, …
 *
 * Se ha de tener en cuenta:
 *
 *  1. fetch devuelve los datos “en crudo”:
 *      - Si la respuesta está en formato JSON habrá con convertirlos.
 *        Dispone de un método (.json()) que hace el JSON.parse. Este método devuelve una nueva promesa.
 *
 *  2. fetch llama a resolve siempre que el servidor conteste, sin comprobar si la respuesta es de éxito
 *     (200, 201, …) o de error (4xx, 5xx).
 *      - Siempre se resolverá la promesa, excepto si se trata de un error de red y el servidor no responde;
 *        por lo que, se deberá verificar la propiedad ok.
 *
 *      La respuesta devuelta por fetch() tiene las siguientes propiedades y métodos:
 *      - status: el código de estado devuelto por el servidor (200, 404, …)
 *      - statusText: el texto correspondiente a ese código (Ok, Not found, …)
 *      - ok: booleano que vale true si el status está entre 200 y 299 y false en caso contrario
 *      - json(): devuelve una promesa que se resolverá con los datos de la respuesta convertidos a un objeto
 *      - otros métodos para convertir los datos según el formato que tengan: text(), blob(), formData(), …
 *        Todos devuelven una promesa con los datos de distintos formatos convertidos.
 *
 *  3. Para peticiones que no sean GET la función fetch() admite un segundo parámetro
 *     con un objeto con la información a enviar en la petición HTTP.
 */

// Insertar Evento con Fetch

let formulario = document.getElementById("addEvento");

formulario.addEventListener("submit", async function (e) {
  e.preventDefault();

  let campoNombre = document.getElementById("name");
  let campoFecha = document.getElementById("date");
  let campoDescripcion = document.getElementById("description");
  let campoPrecio = document.getElementById("price");
  let campoImage = document.getElementById("image"); // Ajustado

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

  if (!formularioValido) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  let reader = new FileReader();

  reader.onload = async function (e) {
    const evento = {
      name: campoNombre.value.trim(),
      date: campoFecha.value,
      description: campoDescripcion.value.trim(),
      price: parseFloat(campoPrecio.value).toFixed(2),
      imgPreview: e.target.result,
    };

    // 1. Creamos la instancia del objeto
    const xhr = new XMLHttpRequest();
    // 2. Establecemos la comunicación con el servidor
    //    -- Añadimos cabeceras a la petición
    //    Método POST:
    xhr.open("POST", `${SERVER}/eventos`, true);
    xhr.setRequestHeader("Content-Type", "application/json"); // indicamos que enviamos un json
    // 3. Enviamos la petición al servidor
    xhr.send(JSON.stringify(evento)); // pasamos producto de Objeto a JSON
    // 4. Ponemos una escucha al objeto
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          const json = JSON.parse(xhr.responseText); // JSON a Objeto -- CALLBACK
          console.log(json);
          location.assign("../index.html");
        } else {
          console.error("Fallo insertando el evento:", xhr.statusText);
        }
      }
    };
  };

  // Aquí es donde realmente lees el archivo:
  if (campoImage.files[0]) {
    reader.readAsDataURL(campoImage.files[0]);
  } else {
    alert("Por favor, selecciona una imagen.");
  }
});
