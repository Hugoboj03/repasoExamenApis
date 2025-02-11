"use strict";
const SERVER = 'http://localhost:8000';

let rimas = [];

// Obtener todas las rimas
async function getRimas() {
  try {
    const resp = await fetch(`${SERVER}/rimas`);
    if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
    const json = await resp.json();
    rimas = json.data;
    renderRimas();
  } catch (error) {
    console.error("Fallo en la obtención de Rimas:", error);
  }
}

// Mostrar las rimas en la página
function renderRimas() {
  let container = document.getElementById("rimaContainer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  rimas.forEach(rima => {
    appendRima(rima, container);
  });
}

// Crear tarjetas para cada rima
function appendRima(rima, container) {
  let rimaCard = document.createElement("div");
  rimaCard.className = "card mb-4";

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let titulo = document.createElement("h4");
  titulo.className = "card-title";
  titulo.textContent = `Palabra: ${rima.word}`;
  cardBody.appendChild(titulo);

  let contenido = document.createElement("p");
  contenido.className = "card-text";
  contenido.textContent = `Rima: ${rima.rhyme}`;
  cardBody.appendChild(contenido);

  // Botón para eliminar la rima
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger";
  deleteBtn.textContent = "Eliminar";
  deleteBtn.onclick = () => deleteRima(rima.word);
  cardBody.appendChild(deleteBtn);

  rimaCard.appendChild(cardBody);
  container.appendChild(rimaCard);
}

// Agregar una nueva rima
async function addRima(event) {
  event.preventDefault();

  let wordInput = document.getElementById("word");
  let rhymeInput = document.getElementById("rhyme");

  if (!wordInput.value || !rhymeInput.value) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevaRima = {
    word: wordInput.value.trim(),
    rhyme: rhymeInput.value.trim(),
  };

  try {
    const resp = await fetch(`${SERVER}/rimas`, {
      method: "POST",
      body: JSON.stringify(nuevaRima),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
    alert("Rima agregada correctamente.");
    wordInput.value = "";
    rhymeInput.value = "";
    getRimas();
  } catch (error) {
    console.error("Fallo al agregar la rima:", error);
    alert("No se pudo agregar la rima.");
  }
}

// Eliminar una rima
async function deleteRima(word) {
  try {
    const resp = await fetch(`${SERVER}/rimas/${word}`, {
      method: "DELETE",
    });

    if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
    alert("Rima eliminada correctamente.");
    getRimas();
  } catch (error) {
    console.error("Fallo al eliminar la rima:", error);
    alert("No se pudo eliminar la rima.");
  }
}

// Inicializar
document.getElementById("addRimaForm")?.addEventListener("submit", addRima);
getRimas();
