import express from "express";
import cors from "cors";
import diccionarioRoutes from "./routes/diccionario.js";  // Nota el cambio a .js
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", diccionarioRoutes);

export default app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});