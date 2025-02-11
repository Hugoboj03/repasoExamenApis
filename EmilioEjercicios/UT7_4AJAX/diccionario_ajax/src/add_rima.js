const SERVER = 'http://localhost:8000';

document.getElementById('addRimaForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  //Se crean las variables que se agarran del formulario
  const palabra = document.getElementById('palabra').value.trim();
  const rimasInput = document.getElementById('rimas').value.trim();

  // Se procede a convertir la cadena de rimas separadas por comas a un array
  const rimas = rimasInput.split(',').map(rima => rima.trim());

  /**
   * Comprobador de si los campos están vacíos
   */
  if (!palabra || rimas.length === 0) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const rima = { palabra, rimas };

  try {
    const resp = await fetch(`${SERVER}/rimas`, {
      method: 'POST',
      body: JSON.stringify(rima),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!resp.ok) {
      const errorData = await resp.json();
      console.error("Error del servidor:", errorData);
      throw new Error(errorData.error || "Error al añadir la rima.");
    }
  
    const result = await resp.json();
    console.log(result.mensaje);
    alert(result.mensaje);
    location.assign("../index.html");
  } catch (error) {
    //Si se produce un error
    console.error("Fallo al añadir la rima:", error);
    alert(`Fallo al añadir la rima: ${error.message}`);
  }
  
});
