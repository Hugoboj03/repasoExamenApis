const SERVER = "http://localhost:8000";

// Función para obtener las rimas del servidor
async function getRimas() {
  try {
    const resp = await fetch(`${SERVER}/rimas`); // Solicitar rimas al servidor
    if (!resp.ok) throw new Error("Error al obtener las rimas.");

    const json = await resp.json();
    console.log("Respuesta del servidor:", json);

    // Verificar si los datos están en json.data o directamente en json
    const rimasDadas = json.data || json; // Se usa json directamente si no hay data
    console.log("Rimas obtenidas:", rimasDadas);

    if (!Array.isArray(rimasDadas)) {
      throw new Error("La respuesta del servidor no es un array válido.");
    }

    displayRimas(rimasDadas);
  } catch (error) {
    console.error("Fallo al obtener las rimas:", error);
  }
}

// Función para mostrar las rimas en el contenedor
function displayRimas(rimasDadas) {
  const container = document.getElementById("rimasContainer");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  rimasDadas.forEach((rima) => {
    const rimaDiv = document.createElement("div");
    rimaDiv.className = "card mb-3 p-3";

    const palabraElemento = document.createElement("h5");
    palabraElemento.textContent = `Palabra: ${rima.palabra}`;

    const rimasElement = document.createElement("p");
    rimasElement.textContent = `Rima: ${rima.rimas.join(", ")}`;

    rimaDiv.appendChild(palabraElemento);
    rimaDiv.appendChild(rimasElement);

    container.appendChild(rimaDiv);
  });
}

getRimas();
