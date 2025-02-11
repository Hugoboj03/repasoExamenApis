const SERVER = "http://localhost:8000";

document.getElementById("confirmDeleteAll").addEventListener("click", async () => {
    try {
      const resp = await fetch(`${SERVER}/rimas`, { method: "DELETE" });

      if (!resp.ok) throw new Error("No se pudieron eliminar las rimas.");

      const resultado = await resp.json();
      alert(resultado.mensaje);

      // Redirigir al menú principal después de eliminar
      location.assign("../index.html");
    } catch (error) {
      alert("Hubo un error al intentar eliminar todas las rimas , "+error);
    }
});
