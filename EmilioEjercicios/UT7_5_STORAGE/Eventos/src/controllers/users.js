import User from "../models/user.js";

/**
 * USUARIOS CON JWT
 */

export async function getAllUsers(req, res) {
  try {
    // Obtención de todos los usuarios de la BBDD
    const users = await User.find({}, { password: 0 }); // Excluyendo el password de la respuesta

    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
}

export async function profile(req, res) {
  try {
    return res.json({ message: `Bienvenido ${req.user.username}` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error obtenido la información del usuario" });
  }
}