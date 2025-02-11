import Evento from "../models/eventos.js";

// Obtener todos los eventos
export async function getAllEvents(req, res) {
    try {
        const eventos = await Evento.find();
        return res.status(200).json({ data: eventos }); // formato JSON
        //return res.send(eventos); // cualquier formato
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Error al obtener los eventos" });
    }
  }
  
// Obtener un evento específico por ID
export async function getOneEvent(req, res, next) {
    const { eventoId } = req.params;
    console.log(req.params);
    try {
        if (!req.context.ObjectId.isValid(eventoId)) {
            const error = new Error(`ID ${eventoId} no es válido`);
            error.status = 400;
            return next(error);
        }
  
        const myId = new req.context.ObjectId(eventoId);
        const evento = await Evento.findOne({
            _id: myId,
        });
  
        if (!evento) {
            const error = new Error(`Evento con ID ${eventoId} no encontrado`);
            error.status = 404;
            return next(error);
        }
  
        return res.status(200).json(evento); // JSON evento.
        //return res.send(evento);
    } catch (er) {
        const error = new Error(
            `Error al obtener el evento con ID ${eventoId} desde la base de datos`
        );
        error.status = 500;
        return next(error);
    }
  }
  
// Agregar un nuevo evento
export async function postOneEvent(req, res, next) {
    try {
        const { name, description, price, date, image } = req.body;
      
        if (!name || !description || !price || !date || !image) {
            const error = new Error(`Todas las propiedades son obligatorias`);
            error.status = 400;
            return next(error);
        }
    
        // Crear el nuevo evento
        const newEvento = new Evento({ name, description, price, date, image });
        const savedEvento = await newEvento.save();
  
        // Validar si la inserción fue exitosa
        if (!savedEvento) {
            const error = new Error('Error al guardar el evento');
            error.status = 500;
            return next(error);
        }
  
        return res.status(201).json({ message: "Evento creado", savedEvento });
    } catch (er) {
        const error = new Error('Error al agregar el evento a la base de datos');
        error.status = 500;
        return next(error);
    }
  }
  
// Eliminar un evento por ID
export async function deleteOneEvent(req, res, next) {
    const { eventoId } = req.params;
    console.log(req.params);
    try {
        if (!req.context.ObjectId.isValid(eventoId)) {
            const error = new Error(`ID ${eventoId} no es válido`);
            error.status = 400;
            return next(error);
        }
        const myId = new req.context.ObjectId(eventoId);
        // Buscar y eliminar el evento
        const deletedEvent = await Evento.deleteOne({
            _id: myId,
        });
  
        if (deletedEvent.deletedCount === 0) {
            const error = new Error(`Evento con ID ${eventoId} no encontrado`);
            error.status = 404;
            return next(error);
        } else {
            const eventos = await Evento.find();
            return res.status(200).json({ message: `Evento con ID ${eventoId} eliminado.`, data: eventos }); // formato JSON
        }

    } catch (er) {
        const error = new Error(`Error al eliminar el evento de la base de datos con ID ${eventoId}`);
        error.status = 500;
        return next(error);
    }
  }