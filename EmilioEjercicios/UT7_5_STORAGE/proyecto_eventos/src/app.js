import {} from "dotenv/config"; // Carga variables de entorno desde .env
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import eventoRouter from "./routes/eventos.js";

import Evento from "./models/eventos.js";
import User from "./models/user.js";


const {
  Types: { ObjectId },
} = mongoose;

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Conectar a la base de datos
connectDB();

// 🔹 Middlewares globales
app.use(
  cors({
    origin: "*", // Permitir acceso desde cualquier origen
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 🔹 Middleware para inyectar modelos en las rutas
app.use((req, res, next) => {
  req.context = { models: { Evento, User }, ObjectId };
  next();
});

// 🔹 Rutas de autenticación y gestión de usuarios
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/eventos", eventoRouter);

// 🔹 Middleware de manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

// 🔹 Ruta principal del servidor
app.get("/", (req, res) => {
  res.send("¡Hola mundo, desde Express!");
});

// 🔹 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto: ${PORT}`);
});

export default app;
