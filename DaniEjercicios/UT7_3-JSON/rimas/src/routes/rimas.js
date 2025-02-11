// Daniel Gaspar Candela


import express from 'express';
let rimas = [];

const rimaRouter = express.Router();

// Añadir rima
rimaRouter.post('/', (req, res) => {
  const { palabra, rima} = req.body;
  
  const newProducto = {
    palabra,
    rima
  };

  rimas.push(newProducto);

  res.status(201).json({
    message: 'Rima añadido con éxito',
    data: newProducto
  });
});


// Obtener todas las rimas
rimaRouter.get('/', (req, res) => {
  res.json({
    message: 'Lista de rimas',
    data: rimas,
  });
});


// Si la palabra existe, muestra todas las rimas con dicha palabra
// Usa un some para ver si existe, y un filter para obtener las rimas
//  con dicha palabra
rimaRouter.get('/palabra/:palabra', (req, res) => {
  const palabraBusc = req.params.palabra;
  
  if (rimas.some(rimaFila => rimaFila.palabra === palabraBusc)) {
    res.json({
      message: `Rimas con la palabra ${palabraBusc}:`,
      data:  rimas.filter(rima => rima.palabra === palabraBusc)
    });
  } else {
    res.json({
      message: `Palabra no encontrada`
    });
  }
});

// Si la rima existe, muestra todas las palabras con las que esta relacionada
// Igual que antes, un some para ver si existe, y un filter para obtener las 
//  palabras con dicha rima
rimaRouter.get('/rima/:rima', (req, res) => {
  const rimaBusc = req.params.rima;
  
  if (rimas.some(rimaFila => rimaFila.rima === rimaBusc)) {
    res.json({
      message: `Palabras con la rima ${rimaBusc}:`,
      data:  rimas.filter(rima => rima.rima === rimaBusc)
    });
  } else {
    res.json({
      message: `Rima no encontrada`
    });
  }
});


// Borrar palabra
// Usa un filter para copiar los datos sin la palabra indicada
rimaRouter.delete('/palabra/:palabra', (req, res) => {
  const palabraElim = req.params.palabra;
  const initialLength = rimas.length;
  rimas = rimas.filter(rimaFila => rimaFila.palabra !== palabraElim);

  if (rimas.length < initialLength) {
    res.json({
      message: `Palabra ${palabraElim} eliminada junto a sus rimas`,
      data: rimas
    });
  } else {
    res.status(404).json({
      message: `Palabra ${palabraElim} no encontrada`
    });
  }
});

// Borrar rima de palabra
// Con un filter saca los datos que no tienen la rima en la palabra indicadas
rimaRouter.delete('/rima/:palabra/:rima', (req, res) => {
  const palabraBusc = req.params.palabra;
  const rimaElim = req.params.rima;

  const initialLength = rimas.length;
  rimas = rimas.filter(rimaFila => !(rimaFila.rima === rimaElim && rimaFila.palabra === palabraBusc));

  if (rimas.length < initialLength) {
    res.json({
      message: `Rima ${rimaElim} eliminada`,
      data: rimas
    });
  } else {
    res.status(404).json({
      message: `Rima o palabra no encontrada`
    });
  }
});


export default rimaRouter;
