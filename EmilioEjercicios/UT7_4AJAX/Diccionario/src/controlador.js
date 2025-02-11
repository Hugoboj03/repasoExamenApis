document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  let forms = document.querySelectorAll(".form-control");
  let ps = document.querySelectorAll(".p-control");
  ps.forEach((p) => p.remove());

  forms.forEach((form) => form.remove());

  // Se obtiene el valor del select
  const opcionSeleccionada = document.getElementById("menu").value;

  let div = document.getElementById("output");
  const elementosPrevios = div.querySelectorAll(
    ".form-control, .mensaje, #selectPalabras"
  );
  elementosPrevios.forEach((element) => element.remove());

  const tablaPrevio = div.querySelector("#tablaRimas");
  if (tablaPrevio) {
    tablaPrevio.remove();
  }

  // Realiza acciones según la opción seleccionada
  switch (opcionSeleccionada) {
    case "1":
      // Lógica para agregar rima

      const formularioRima = document.createElement("form");
      formularioRima.classList.add("form-control");

      formularioRima.id = "formRima";

      const labelPalabra = document.createElement("label");
      labelPalabra.textContent = "Palabra: ";
      const inputPalabra = document.createElement("input");
      inputPalabra.type = "text";
      inputPalabra.id = "palabra";
      inputPalabra.required = true;

      const labelRima = document.createElement("label");
      labelRima.textContent = "Rima: ";
      const inputRima = document.createElement("input");
      inputRima.type = "text";
      inputRima.id = "rima";
      inputRima.required = true;

      const enviar = document.createElement("input");
      enviar.type = "submit";
      enviar.value = "Agregar";

      formularioRima.append(document.createElement("br"));

      formularioRima.append(labelPalabra);
      formularioRima.append(inputPalabra);
      formularioRima.append(document.createElement("br"));
      formularioRima.append(labelRima);
      formularioRima.append(inputRima);
      formularioRima.append(document.createElement("br"));
      formularioRima.append(enviar);

      // Agregar el formulario al contenedor 'div'
      div.append(formularioRima);

      formularioRima.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío normal del formulario

        const palabra = inputPalabra.value.trim();
        const rima = inputRima.value.trim();

        const mensajePrevio = formularioRima.querySelector(".mensaje");
        if (mensajePrevio) {
          mensajePrevio.remove();
        }
        let textoRima = document.createElement("p");
        textoRima.classList.add("mensaje"); // Clase para identificar el mensaje

        if (/^[a-zA-Z\s]+$/.test(palabra) || /^[a-zA-Z\s]+$/.test(rima)) {
          if (palabra && rima) {
            // Llamada a la función agregarRima
            DiccionarioDeRimas.agregarRima(palabra, rima);
            textoRima.style.color = "green";
            textoRima.textContent =
              "Rima creada exitosamente: " + palabra + " - " + rima;
            formularioRima.append(textoRima);
  
            // Limpiar los campos del formulario después de agregar la rima
            inputPalabra.value = "";
            inputRima.value = "";
          }else {
            textoRima.textContent = "Por favor, completa ambos campos.";
            textoRima.style.color = "red";
            formularioRima.append(textoRima);
          }
        }else{
          textoRima.textContent = "Por favor, ingrese solo letras.";
          textoRima.style.color = "red";
          formularioRima.append(textoRima);
        }
        
      });
      break;

    case "2":
      // Lógica para obtener rima

      //Creación del formulario para la búsqueda
      const formularioObtener = document.createElement("form");
      formularioObtener.classList.add("form-control");
      formularioObtener.id = "formObtener";

      const labelObtener = document.createElement("label");
      labelObtener.textContent = "Palabra: ";
      const inputObtener = document.createElement("input");
      inputObtener.type = "text";
      inputObtener.id = "palabraObtener";
      inputObtener.required = true;

      const enviarObtener = document.createElement("input");
      enviarObtener.type = "submit";
      enviarObtener.value = "Obtener";

      formularioObtener.append(document.createElement("br"));
      formularioObtener.append(labelObtener);
      formularioObtener.append(inputObtener);
      formularioObtener.append(enviarObtener);

      // Agregar el formulario al contenedor 'div'
      div.append(formularioObtener);


      // Evento del formulario para obtener la rima
      formularioObtener.addEventListener("submit", function (event) {
        event.preventDefault();
        const palabra = inputObtener.value.trim();

        const mensajePrevio = formularioObtener.querySelector(".mensaje");
        if (mensajePrevio) {
          mensajePrevio.remove();
        }

        let texto = document.createElement("p");
        texto.classList.add("mensaje");

        // Validación de la palabra
        if (/^[a-zA-Z\s]+$/.test(palabra)) {// Regex para permitir solo letras y espacios
          if (palabra) {
            const rimaObtener = DiccionarioDeRimas.obtenerRimas(palabra);
            if (!rimaObtener) {
              texto.textContent = "La palabra no se encuentra en el diccionario.";
              texto.style.color = "red";
              formularioObtener.append(texto);
              return;
            } else {
              texto.textContent =
                "Rima obtenida para la palabra " + palabra + " : " + rimaObtener;
              texto.style.color = "green";
              formularioObtener.append(texto);
              inputObtener.value = "";
            }
          } else {
            texto.textContent = "Por favor, ingresa una palabra.";
            texto.style.color = "red";
            formularioObtener.append(texto);
          }
        }else{
          texto.textContent = "Por favor, ingrese solo letras.";
          texto.style.color = "red";
          formularioObtener.append(texto);
        }
        
      });

      break;

    case "3":
      // Lógica para eliminar rima
      // Creación del formulario para la eliminación
      let formularioEliminarRima = document.createElement("form");
      formularioEliminarRima.classList.add("form-control");
      formularioEliminarRima.id = "formEliminarRima";

      let labelRecogerPalabra = document.createElement("label");
      labelRecogerPalabra.textContent = "Palabra: ";
      let inputRecogerPalabra = document.createElement("input");
      inputRecogerPalabra.type = "text";
      inputRecogerPalabra.id = "palabraARecoger";

      let labelEliminarRima = document.createElement("label");
      labelEliminarRima.textContent = "Rima: ";
      let inputEliminarRima = document.createElement("input");
      inputEliminarRima.type = "text";
      inputEliminarRima.id = "rimaAEliminar";
      inputEliminarRima.required = true;

      let enviarEliminarRima = document.createElement("input");
      enviarEliminarRima.type = "submit";
      enviarEliminarRima.value = "Eliminar";

      formularioEliminarRima.append(document.createElement("br"));
      formularioEliminarRima.append(labelRecogerPalabra);
      formularioEliminarRima.append(inputRecogerPalabra);
      formularioEliminarRima.append(document.createElement("br"));
      formularioEliminarRima.append(labelEliminarRima);
      formularioEliminarRima.append(inputEliminarRima);
      formularioEliminarRima.append(document.createElement("br"));
      formularioEliminarRima.append(enviarEliminarRima);

      div.append(formularioEliminarRima);

      formularioEliminarRima.addEventListener("submit", function (event) {
        event.preventDefault();
        const palabraAEliminar = inputRecogerPalabra.value.trim();
        const rimaAEliminar = inputEliminarRima.value.trim();

        const mensajePrevio = formularioEliminarRima.querySelector(".mensaje");
        if (mensajePrevio) {
          mensajePrevio.remove();
        }

        let texto = document.createElement("p");
        texto.classList.add("mensaje");

        if (/^[a-zA-Z\s]+$/.test(palabraAEliminar) || /^[a-zA-Z\s]+$/.test(rimaAEliminar)) {
          if (palabraAEliminar && rimaAEliminar) {
            DiccionarioDeRimas.eliminarRima(palabraAEliminar, rimaAEliminar);
            inputRecogerPalabra.value = "";
            inputEliminarRima.value = "";
            texto.textContent = "Palabra eliminada exitosamente.";
            texto.style.color = "green";
            formularioEliminarRima.append(texto);
          } else {
            texto.textContent = "Por favor, ingresa ambos los campos.";
            texto.style.color = "red";
            formularioEliminarRima.append(texto);
          }
        }else{
          texto.textContent = "Por favor, ingrese solo letras.";
          texto.style.color = "red";
          formularioEliminarRima.append(texto);
        }
        
      });

      break;

    case "4":
      let formularioEliminarPalabra = document.createElement("form");
      formularioEliminarPalabra.classList.add("form-control");
      formularioEliminarPalabra.id = "formEliminarPalabra";

      let labelPalabraAEliminar = document.createElement("label");
      labelPalabraAEliminar.textContent = "Palabra: ";

      let inputPalabraAEliminar = document.createElement("input");
      inputPalabraAEliminar.type = "text";
      inputPalabraAEliminar.id = "palabraAEliminar";
      let enviarEliminarPalabra = document.createElement("input");
      enviarEliminarPalabra.type = "submit";
      enviarEliminarPalabra.value = "Eliminar";

      formularioEliminarPalabra.append(document.createElement("br"));
      formularioEliminarPalabra.append(labelPalabraAEliminar);
      formularioEliminarPalabra.append(inputPalabraAEliminar);
      formularioEliminarPalabra.append(document.createElement("br"));
      formularioEliminarPalabra.append(enviarEliminarPalabra);

      div.append(formularioEliminarPalabra);

      formularioEliminarPalabra.addEventListener("submit", function (event) {
        event.preventDefault();
        const palabraAEliminar = inputPalabraAEliminar.value.trim();

        const mensajePrevio =
          formularioEliminarPalabra.querySelector(".mensaje");
        if (mensajePrevio) {
          mensajePrevio.remove();
        }

        let texto = document.createElement("p");
        texto.classList.add("mensaje");

        if (/^[a-zA-Z\s]+$/.test(palabraAEliminar)) {
          if (palabraAEliminar) {
            DiccionarioDeRimas.eliminarPalabra(palabraAEliminar);
            inputPalabraAEliminar.value = "";
            texto.textContent = "Palabra eliminada exitosamente.";
            texto.style.color = "green";
            formularioEliminarPalabra.append(texto);
          } else {
            texto.textContent = "Por favor, ingresa una palabra.";
            texto.style.color = "red";
            formularioEliminarPalabra.append(texto);
          }
        }else{
          texto.textContent = "Por favor, ingrese solo letras.";
          texto.style.color = "red";
          formularioEliminarPalabra.append(texto);
        }
       
      });
      break;

    case "5":
      let formularioBuscar = document.createElement("form");
      formularioBuscar.classList.add("form-control");
      formularioBuscar.id = "formBuscar";

      let labelBuscar = document.createElement("label");
      labelBuscar.textContent = "Buscar palabra o patrón: ";
      let inputBuscar = document.createElement("input");
      inputBuscar.type = "text";
      inputBuscar.id = "palabraBuscar";
      inputBuscar.required = true;

      let enviarBuscar = document.createElement("input");
      enviarBuscar.type = "submit";
      enviarBuscar.value = "Buscar";

      formularioBuscar.append(document.createElement("br"));
      formularioBuscar.append(labelBuscar);
      formularioBuscar.append(inputBuscar);
      formularioBuscar.append(document.createElement("br"));
      formularioBuscar.append(enviarBuscar);

      div.append(formularioBuscar);

      formularioBuscar.addEventListener("submit", function (event) {
        event.preventDefault();
        const palabraBuscar = inputBuscar.value.trim();

        // Elimina cualquier mensaje previo dentro de este formulario
        const mensajePrevio = formularioBuscar.querySelector(".mensaje");
        if (mensajePrevio) {
          mensajePrevio.remove();
        }

        let texto = document.createElement("p");
        texto.classList.add("mensaje");

        // Eliminar todos los mensajes anteriores (si los hay) en el formulario antes de mostrar el nuevo
        const mensajesPrevios = formularioBuscar.querySelectorAll("p");
        mensajesPrevios.forEach((msg) => msg.remove());

        if (/^[a-zA-Z\s]+$/.test(palabraBuscar)) {
          if (palabraBuscar) {
            const rimaEncontrada =
              DiccionarioDeRimas.buscarRimaPorClave(palabraBuscar);
            if (rimaEncontrada) {
              texto.textContent =
                "Palabra o patrón encontrada: " + rimaEncontrada;
              texto.style.color = "green";
            } else {
              texto.textContent =
                "No se encontraron rimas para la palabra/patrón.";
              texto.style.color = "red";
            }
            formularioBuscar.append(texto);
          } else {
            texto.textContent = "Por favor, ingresa una palabra o patrón.";
            texto.style.color = "red";
            formularioBuscar.append(texto);
          }
        }else{
          texto.textContent = "Por favor, ingrese solo letras.";
          texto.style.color = "red";
          formularioBuscar.append(texto);
        }
        
      });
      break;

      case "6":
        // Crear el formulario para seleccionar palabras
        let formularioSelect = document.createElement("form");
        formularioSelect.classList.add("form-control");
        formularioSelect.id = "formSeleccionar";
      
        // Generar el select de palabras desde DiccionarioDeRimas
        let selectPalabras = DiccionarioDeRimas.generarSelectDePalabras();
      
        // Crear el botón "Asignar"
        let botonAsignar = document.createElement("button");
        botonAsignar.textContent = "Asignar";
        botonAsignar.type = "button"; // Evitar que se envíe el formulario al pulsar
        botonAsignar.id = "botonAsignar";
      
        // Agregar elementos al formulario
        formularioSelect.append(selectPalabras);
        formularioSelect.append(document.createElement("br"));
        formularioSelect.append(botonAsignar);
      
        // Limpiar cualquier contenido previo y agregar el formulario al contenedor
        div.innerHTML = ""; // Limpiamos todo el contenido dentro de 'div'
        div.append(formularioSelect);
      
        // Evento al pulsar el botón "Asignar"
        botonAsignar.addEventListener("click", function () {
          // Se obtiene la palabra seleccionada
          const palabraSeleccionada = selectPalabras.value;
      
          // Elimina la tabla anterior si existe
          const tablaPrevio = div.querySelector("#tablaRimas");
          if (tablaPrevio) {
            tablaPrevio.remove();
          }

          const mensajePrevio = formularioSelect.querySelector(".mensaje");
          if (mensajePrevio) {
            mensajePrevio.remove();
          }
  
          let texto = document.createElement("p");
          texto.classList.add("mensaje");
      
          if (/^[a-zA-Z\s]+$/.test(palabraSeleccionada)) {
            if (palabraSeleccionada) {
              // Crear la tabla con las rimas
              const tabla = document.createElement("table");
              tabla.id = "tablaRimas";
  
              // Crear el encabezado de la tabla
              const thead = document.createElement("thead");
              const encabezadoRow = document.createElement("tr");
              const encabezadoPalabra = document.createElement("th");
              encabezadoPalabra.textContent = "Palabra";
              const encabezadoRima = document.createElement("th");
              encabezadoRima.textContent = "Rimas";
        
              encabezadoRow.append(encabezadoPalabra, encabezadoRima);
              thead.append(encabezadoRow);
              tabla.append(thead);
        
              // Crear el cuerpo de la tabla
              const tbody = document.createElement("tbody");
              const fila = document.createElement("tr");
        
              // Celda de la palabra
              const celdaPalabra = document.createElement("td");
              celdaPalabra.textContent = palabraSeleccionada;
        
              // Celda de las rimas
              const celdaRima = document.createElement("td");
              const rimas = DiccionarioDeRimas.obtenerRimas(palabraSeleccionada); // Método para obtener las rimas
              celdaRima.textContent = rimas.join(", "); // Mostrar rimas separadas por comas
        
              fila.append(celdaPalabra, celdaRima);
              tbody.append(fila);
              tabla.append(tbody);
        
              // Agregar la tabla al contenedor
              div.append(tabla);
  
  
              
            } else {
              // Mensaje de error si no se selecciona una palabra
              texto.textContent = "Por favor, seleccione una palabra.";
              texto.style.color = "red";
              div.append(texto);
  
            }
          }else{
            // Mensaje de error si se ingresa un número en lugar de una palabra
            texto.textContent = "Por favor, ingrese solo letras.";
            texto.style.color = "red";
            div.append(texto);
          }
          
        });
      
        break;
      
  }
});
