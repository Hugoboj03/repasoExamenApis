import express from 'express';
import { productos } from '../../data/productos.js';

const productRouter = express.Router();

// Añadir producto
productRouter.post('/', (req, res) => {
  const { name, description, photo } = req.body;
  
  const newProducto = {
    id: productos.length + 1,
    name,
    description,
    photo
  };

  productos.push(newProducto);

  res.status(201).json({
    message: 'Producto añadido con éxito',
    data: newProducto
  });
});

// Obtener todos los eventos
productRouter.get('/', (req, res) => {
  res.json({
    message: 'Lista de productos',
    data: productos
  });
});

// Obtener productos por ID
productRouter.get('/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  
  if (productos.find(producto => producto.id === productoId)) {
    res.json({
      message: 'Producto',
      data: productos.filter(producto => producto.id == req.params.id)
    });
  } else {
    res.json({
      message: `Producto con id ${productoId} no encontrado`
    });
  }
});

// Borrar productos por ID
productRouter.delete('/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  const initialLength = productos.length;
  productos = productos.filter(producto => producto.id !== productoId);

  if (productos.length < initialLength) {
    res.json({
      message: `Producto con id ${productoId} eliminado`,
      data: productos
    });
  } else {
    res.status(404).json({
      message: `Producto con id ${productoId} no encontrado`
    });
  }
});

export default productRouter;
