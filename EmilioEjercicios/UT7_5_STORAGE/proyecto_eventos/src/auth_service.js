const SERVER = "http://localhost:8000";
/**
 * PROCESO DE AUTENTICACIÓN
 */
export class Auth {
  static async login(username, password) {
    const response = await fetch(`${SERVER}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Credenciales incorrectas");

    const data = await response.json();
    localStorage.setItem("token", data.token); // Guardar token
  }

  static async register(dataUser) {
    const response = await fetch(`${SERVER}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    });

    if (!response.ok) {
      throw new Error("Error en el registro");
    } else {
      return response.json();
    }
  }

  static async checkToken() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const response = await fetch(`${SERVER}/auth/validate`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      location.assign("./login.html");
      throw new Error("Invalid token");
    } 

    return response.ok;


  }

  static logout() {
    localStorage.removeItem("token"); // Borrar token
    sessionStorage.clear();
  }
}
// Exportamos la clase para poder importarla en otros archivos
export default Auth;
/**
 * Registro de usuario.
 * Campos requeridos:
 *  - username
 *  - email
 *  - password
 */
export async function register(req, res) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No hay token disponible.");
    return;
  }
  if (token) headers.Authorization = "Bearer " + token;

  try {
    const { username, email, password, avatar } = req.body;
    console.log(req.body);
    // Chequeamos los campos requeridos para el registro
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor; introduzca username, email y password" });
    }

    // Chequeamos si el usuario existe en la BBDD
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya existe." });
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
      avatar,
    });

    await newUser.save();

    return res.status(201).json({ message: "Usuario creado", newUser });
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
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No hay token disponible.");
    return;
  }
  if (token) headers.Authorization = "Bearer " + token;

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
    return res
      .status(500)
      .json({ message: "Error durante el inicio de sesión" });
  }
}

export async function authenticate(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ error: "No autorizado! - Autenticación requerida" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded);
    if (!decoded) {
      throw new Error();
    }
    const user = await User.findById(decoded.userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    req.user = user;
    return req.user;
    // next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Error validando token - Token inválido" });
  }
}

