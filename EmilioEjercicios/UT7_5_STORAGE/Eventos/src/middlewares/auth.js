import jwt from "jsonwebtoken";
import User from "../models/user.js";

export async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      return res.status(401).json({ error: "No autorizado! - Autenticación requerida" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded);
    if (!decoded) {
      throw new Error();
    }
    const user = await User.findById(decoded.userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.user = user;
    // return req.user;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error validando token - Token inválido" });
  }
}
