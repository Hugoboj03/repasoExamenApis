import express from 'express';

const app = express.Router();

// Diccionario de rimas en memoria
const diccionarioDeRimas = new Map();

// Obtener todas las rimas
app.get("/rimas", (req, res) => {
  const rimas = Array.from(diccionarioDeRimas.entries(), ([palabra, rimasList]) => ({
    palabra,
    rimas: rimasList,
  }));
  
  res.json(rimas);
});


// Obtener rimas de una palabra específica

app.get("/rimas/:palabra", (req, res) => {
  const { palabra } = req.params;
  if (diccionarioDeRimas.has(palabra)) {
    res.json({ palabra, rimas: diccionarioDeRimas.get(palabra) });
  } else {
  // Si la palabra no existe, se devuelve un mensaje de error
    res.status(404).json({ error: "Palabra no encontrada" });
  }
});




// Agregar una nueva palabra con sus rimas
app.post("/rimas", (req, res) => {
  const { palabra, rimas } = req.body;

  if (!palabra || !Array.isArray(rimas)) {
    return res.status(400).json({ error: "Se requiere una palabra y una lista de rimas" });
  }

  // Si la palabra ya existe, añadimos las rimas nuevas sin duplicarlas
  if (diccionarioDeRimas.has(palabra)) {
    const rimasExistentes = diccionarioDeRimas.get(palabra);
    const nuevasRimas = [...new Set([...rimasExistentes, ...rimas])]; // Evita duplicados
    diccionarioDeRimas.set(palabra, nuevasRimas);
    return res.status(200).json({ mensaje: "Rimas añadidas a la palabra existente" });
  }

  // Si la palabra no existe, la agregamos al diccionario
  diccionarioDeRimas.set(palabra, rimas);
  res.status(201).json({ mensaje: "Palabra agregada exitosamente" });
});

// Eliminar una palabra del diccionario
app.delete("/rimas/:palabra", (req, res) => {
  const { palabra } = req.params;
  if (!diccionarioDeRimas.has(palabra)) {
    return res.status(404).json({ error: "Palabra no encontrada" });
  }
  diccionarioDeRimas.delete(palabra);
  res.json({ mensaje: "Palabra eliminada exitosamente" });
});

// Eliminar todas las rimas del diccionario
app.delete("/rimas", (req, res) => {
  diccionarioDeRimas.clear(); // Limpia completamente el Map
  res.json({ mensaje: "Todas las rimas han sido eliminadas exitosamente" });
});


export default app;
