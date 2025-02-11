import express from 'express';
let rimas = [];

const rimaRouter = express.Router();

// Añadir rima
rimaRouter.post('/', (req, res) => {
  const { palabra, rima } = req.body;

  // Buscar si la palabra ya existe en el array
  let palabraExistente = rimas.find(item => item.palabra === palabra);

  if (palabraExistente) {
      // Si la rima no está ya en la lista, la añadimos
      if (!palabraExistente.rimas.includes(rima)) {
          palabraExistente.rimas.push(rima);
          res.json({
              message: `Rima añadida a la palabra "${palabra}".`,
              data: palabraExistente
          });
      } else {
          res.status(400).json({
              message: `La rima "${rima}" ya existe para la palabra "${palabra}".`
          });
      }
  } else {
      // Si la palabra no existe, la agregamos con la nueva rima
      const nuevaEntrada = {
          palabra,
          rimas: [rima]
      };
      rimas.push(nuevaEntrada);
      res.status(201).json({
          message: "Nueva palabra añadida con su primera rima.",
          data: nuevaEntrada
      });
  }
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

rimaRouter.delete('/rima/:palabra/:rima', (req, res) => {
  const { palabra, rima } = req.params;

  // Buscar la palabra en el array de rimas
  let palabraObj = rimas.find(item => item.palabra === palabra);

  if (!palabraObj) {
      return res.status(404).json({ message: `La palabra "${palabra}" no existe.` });
  }

  // Verificar si la rima existe en el array
  const index = palabraObj.rimas.indexOf(rima);
  if (index === -1) {
      return res.status(404).json({ message: `La rima "${rima}" no está asociada a "${palabra}".` });
  }

  // Eliminar la rima del array
  palabraObj.rimas.splice(index, 1);

  // Si la palabra ya no tiene rimas, la eliminamos del array principal
  if (palabraObj.rimas.length === 0) {
      rimas = rimas.filter(item => item.palabra !== palabra);
      return res.json({
          message: `Se eliminó la última rima de "${palabra}", por lo que la palabra también fue eliminada.`,
          data: rimas
      });
  }

  res.json({
      message: `La rima "${rima}" fue eliminada de la palabra "${palabra}".`,
      data: palabraObj
  });
});


export default rimaRouter;
