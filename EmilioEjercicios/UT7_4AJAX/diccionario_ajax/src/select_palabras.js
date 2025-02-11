const SERVER = "http://localhost:8000"; 


document.getElementById("selectDePalabrasBtn").addEventListener("click", async function () {
    try {
      const resp = await fetch(`${SERVER}/rimas`);
  
      if (!resp.ok) throw new Error("Error al obtener las palabras.");
  
      const data = await resp.json();
      console.log("datos recibidos del servidor: ", data);
  
      // Limpiar el contenedor antes de agregar un nuevo select
      const contenedor = document.getElementById("contenedorSelect");
      while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
      }
  
      //Si está vacío
      if (data.length === 0) {
        console.warn("No hay palabras disponibles.");
        return;
      }
  
      const select = document.createElement("select");
      select.id = "selectPalabras";
      select.className = "form-select";
  
      const optionDefault = document.createElement("option");
      optionDefault.value = "";
      optionDefault.textContent = "Selecciona una palabra";
      select.appendChild(optionDefault);
  
      // Agregar opciones al select
      data.forEach(({ palabra }) => {
        const option = document.createElement("option");
        option.value = palabra;
        option.textContent = palabra;
        select.appendChild(option);
      });
  
      contenedor.appendChild(select);
  
      // Evento cuando se selecciona una palabra
      select.addEventListener("change", function () {
        const palabraSeleccionada = select.value;
        if (palabraSeleccionada) {
          mostrarRimas(palabraSeleccionada, data);
        }
      });
  
    } catch (error) {
      alert("Fallo al obtener las palabras:", error);
    }
  });
  
  // Mostrar las rimas de una palabra seleccionada
  /**
   * Encuentra la palabra para luego crear un contenedor
   * el cual contiene el resultado, si no se encuentran rimas se mencionará
   * 
   * @param {*} palabra 
   * @param {*} data 
   * @returns 
   */
  function mostrarRimas(palabra, data) {
    const palabraEncontrada = data.find((obj) => obj.palabra === palabra);
  
    const resultadoContenedor = document.getElementById("resultadoContenedor");
  
    while (resultadoContenedor.firstChild) {
      resultadoContenedor.removeChild(resultadoContenedor.firstChild);
    }
  
    if (!palabraEncontrada) {
      const mensaje = document.createElement("p");
      mensaje.textContent = "No se encontraron rimas.";
      resultadoContenedor.appendChild(mensaje);
      return;
    }
  
    const rimaHeading = document.createElement("h5");
    rimaHeading.textContent = `Rimas de "${palabra}":`;
    resultadoContenedor.appendChild(rimaHeading);
  
    const rimasLista = document.createElement("ul");
    palabraEncontrada.rimas.forEach((rima) => {
      const listItem = document.createElement("li");
      listItem.textContent = rima;
      rimasLista.appendChild(listItem);
    });
  
    resultadoContenedor.appendChild(rimasLista);
  }
  