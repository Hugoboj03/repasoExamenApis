import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import eventosRoutes from "./routes/eventos.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Array de eventos (si no está en otro archivo)

// Habilitar CORS
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Rutas principales
app.use("/", eventosRoutes);

// Servir archivos estáticos
app.use(express.static("public"));

// Iniciar el servidor
export default app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});