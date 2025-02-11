import express from 'express';


let eventos = [];
const app = express.Router();

const nuevoEvento ={
    id: Date.now(),
    name: "Evento 1",
    date: Date.now(),
    description: "Prueba",
    price: 1.20,
    imgPreview: false
};

eventos.push(nuevoEvento);

// Obtener todos los eventos
app.get("/eventos", (req, res) => {
  res.json({
    message: "Listado de eventos",
    data: eventos
  });
});

// Obtener productos por ID
// Ruta GET para obtener un evento por su ID
app.get("/eventos/:id", (req, res) => {
  const eventoId = parseInt(req.params.id);  // Extrae el parámetro id de la ruta
  const evento = eventos.find(evento => evento.id === eventoId);  // Busca el evento en el array

  if (evento) {
    res.json({
      message: "Evento encontrado",
      data: evento,
    });
  } else {
    res.status(404).json({
      message: `Evento con id ${eventoId} no encontrado.`,
    });
  }
});


// Crear un nuevo evento
app.post("/eventos", (req, res) => {
  const {name,date,description,price,imgPreview} = req.body;

  // Validar los datos del evento
  const nuevoEvento ={
    id: eventos.length + 1,
    name,
    date,
    description,
    price,
    imgPreview
  };

  
  eventos.push(nuevoEvento);

  res.status(201).json({
    message: "Evento creado con éxito.",
    event: nuevoEvento
  });
});

// Eliminar un evento por ID
app.delete("/eventos/:id", (req, res) => {
  const eventoId = parseInt(req.params.id);
  const initialLength = eventos.length;
  eventos = eventos.filter(evento => evento.id !== eventoId);

  if(eventos.length < initialLength){
    res.json({
      message: `Evento con id ${eventoId} eliminado`
    });
  }else{
    res.status(404).json({
      message: `Evento con id ${eventoId} no encontrado`,
    })
  }
});

export default app;
