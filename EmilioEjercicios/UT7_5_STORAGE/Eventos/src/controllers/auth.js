import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
/**
 * PROCESO DE AUTENTICACIÓN
 */

/**
 * Registro de usuario.
 * Campos requeridos:
 *  - username
 *  - email
 *  - password
 */
export async function register(req, res) {
  try {
    const { username, email, password, avatar } = req.body;
    console.log(req.body);
    // Chequeamos los campos requeridos para el registro
    if (!username || !email|| !password) {
      return res
        .status(400)
        .json({ message: "Por favor; introduzca username, email y password" });
    }

    // Chequeamos si el usuario existe en la BBDD
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "El nombre de usuario ya existe." });
    }
    const existingEmailUser = await User.findOne({ email });

    if (existingEmailUser) {
      return res.status(400).json({ message: "El email ya existe." });
    }

    // Hash Password del usuario
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Inserción del usuario en la BBDD
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Usuario creado", newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creando el usuario" });
  }
}

/**
 * Login de usuario.
 * Campos requeridos:
 *  - username
 *  - password
 */
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Chequeamos los campos requeridos para el login
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Por favor; introduce nombre de usuario y password" });
    }

    // Chequeamos si el usuario existe en la BBDD
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Compara Passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password incorrecto" });
    }

    // Generación JWT Token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY || "1234!@#%<{*&)",
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Sesión iniciada", data: user, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error durante el inicio de sesión" });
  }
}

export async function authenticate(req, res) {
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
    req.user = user;
    return req.user;
    // next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Error validando token - Token inválido" });
  }
}