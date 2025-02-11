// Daniel Gaspar Candela


import express from 'express';
let eventos = [];

const eventRouter = express.Router();

// Añadir evento
eventRouter.post('/', (req, res) => {
  const { nombre, fecha, descripcion, precio, imagen } = req.body;
  
  const newProducto = {
    id: eventos.length + 1,
    nombre,
    fecha,
    descripcion,
    precio,
    imagen
  };

  eventos.push(newProducto);

  res.status(201).json({
    message: 'Evento añadido con éxito',
    data: newProducto
  });
});


// Obtener todos los eventos
eventRouter.get('/', (req, res) => {
  res.json({
    message: 'Lista de eventos',
    data: eventos,
  });
});


// Obtener eventos por ID
// Usa un find para mostrar los datos con el id indicado
eventRouter.get('/:id', (req, res) => {
  const eventoId = parseInt(req.params.id);
  
  if (eventos.find(evento => evento.id === eventoId)) {
    res.json({
      message: 'Evento',
      data: eventos.filter(evento => evento.id == req.params.id)
    });
  } else {
    res.json({
      message: `Evento con id ${eventoId} no encontrado`
    });
  }
});


// Borrar eventos por ID
// Usa un filter para copiar los datos sin el id indicado
eventRouter.delete('/:id', (req, res) => {
  const eventoId = parseInt(req.params.id);
  const initialLength = eventos.length;
  eventos = eventos.filter(evento => evento.id !== eventoId);

  if (eventos.length < initialLength) {
    res.json({
      message: `Evento con id ${eventoId} eliminado`,
      data: eventos
    });
  } else {
    res.status(404).json({
      message: `Evento con id ${eventoId} no encontrado`
    });
  }
});

export default eventRouter;
