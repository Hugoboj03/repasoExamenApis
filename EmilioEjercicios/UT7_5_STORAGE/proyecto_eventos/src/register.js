import { Auth } from "./auth_service.js";

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("form-register");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const email2 = document.getElementById("email2").value.trim();
        const password = document.getElementById("password").value.trim();
        const avatar = document.getElementById("avatar").value.trim(); // Base64

        if (!username || !email || !email2 || !password || !avatar) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (email !== email2) {
            alert("Los correos electrónicos no coinciden.");
            return;
        }

        const dataUser ={
            username: username,
            email: email,
            password: password,
            avatar: avatar
        }

        try {
            await Auth.register(dataUser);
            alert("Registro exitoso. Redirigiendo al login...");
            window.location.href = "./login.html";
        } catch (error) {
            alert("Error en el registro. Inténtalo de nuevo.");
        }
    });
});
