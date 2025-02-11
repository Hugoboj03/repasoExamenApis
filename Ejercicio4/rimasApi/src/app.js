// Daniel Gaspar Candela


import express from 'express';
import cors from 'cors';
import rimaRouter from './routes/rimas.js';

const PORT = 3000;
const app = express();

app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));

app.use('/diccionario', rimaRouter);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
  });
  
  