const SERVER = 'http://localhost:8000';

document.getElementById('delRimaForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const palabra = document.getElementById('palabra').value.trim();

  //Si no se encuentra la palabra.
  if (!palabra) {
    alert("Por favor, introduce una palabra.");
    return;
  }

  try {
    const resp = await fetch(`${SERVER}/rimas/${encodeURIComponent(palabra)}`, {
      method: 'DELETE',
    });

    if (!resp.ok) throw new Error("Error al eliminar la rima.");
    alert("Rima eliminada correctamente.");
    location.assign("../index.html");
  } catch (error) {
    alert("Fallo al eliminar la rima:", error);

  }
});
