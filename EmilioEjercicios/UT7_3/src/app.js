import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors'; // Asegúrate de importar cors
import bodyParser from 'body-parser';
import productosRoutes from './routes/productos.js';

const app = express();
//const PORT = 3000;
const PORT = process.env.PORT || 3000;
//console.log(process.env);

// Habilitando CORS para todas las solicitudes
// cualquier dominio podrá acceder a los recursos
// app.use(cors());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

//-- Middlewares
// app.use(express.json()); // Permite trabajar con JSON en las solicitudes
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true })); // Soporta datos codificados en URL
//--

app.use('/productos', productosRoutes);


// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola mundo, desde Express!');
});

export default app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
