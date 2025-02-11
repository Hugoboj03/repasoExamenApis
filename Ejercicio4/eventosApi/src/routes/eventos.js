import express from 'express';


// Almacenamiento temporal de eventos
let eventos = [];

const eventRouter = express.Router();

// Añadir evento
eventRouter.post('/', (req, res) => {
  const { name, description, price, date, image } = req.body;
  
  const newEvent = {
    id: eventos.length + 1,
    name,
    description,
    price,
    date,
    image
  };

  eventos.push(newEvent);

  res.status(201).json({
    message: 'Evento añadido con éxito',
    data: newEvent
  });
});

// Obtener todos los eventos
eventRouter.get('/', (req, res) => {
  res.json({
    message: 'Lista de eventos',
    data: eventos
  });
});

// Obtener evento por ID
eventRouter.get('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  
  if (eventos.find(event => event.id === eventId)) {
    res.json({
      message: 'Evento',
      data: eventos.filter(event => event.id == req.params.id)
    });
  } else {
    res.json({
      message: `Evento con id ${eventId} no encontrado`
    });
  }
});

// Borrar evento por ID
eventRouter.delete('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const initialLength = eventos.length;
  eventos = eventos.filter(event => event.id !== eventId);

  if (eventos.length < initialLength) {
    res.json({
      message: `Evento con id ${eventId} eliminado`,
      data: eventos
    });
  } else {
    res.status(404).json({
      message: `Evento con id ${eventId} no encontrado`
    });
  }
});

export default eventRouter;
