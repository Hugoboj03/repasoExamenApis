import Auth from "./auth_service.js";



document.addEventListener("DOMContentLoaded", async () => {

    Auth.logout();
    // Verificar si el usuario ya está autenticado
    const isAuthenticated = await Auth.checkToken();
    if (isAuthenticated) {
        window.location.href = "./index.html"; // Redirigir si ya está logueado
        return;
    }

    const loginForm = document.getElementById("form-login");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            await Auth.login(username, password);
            window.location.href = "./index.html"; // Redirigir tras login exitoso
        } catch (error) {
            alert("Error: Usuario o contraseña incorrectos");
        }
    });
});