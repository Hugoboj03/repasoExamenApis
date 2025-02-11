// Daniel Gaspar Candela


import express from 'express';
import cors from 'cors';
import eventRouter from './routes/eventos.js';

const PORT = 2000;
const app = express();

app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));

app.use('/productos', eventRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
  });
  
  