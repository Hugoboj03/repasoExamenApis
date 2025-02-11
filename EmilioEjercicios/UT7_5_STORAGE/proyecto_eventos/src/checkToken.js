import { Auth } from "./auth_service.js";

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    await Auth.checkToken();
  } catch (error) {
    location.assign("login.html");
  }
});
const token = Auth.checkToken();
if(token){
    console.log("Token válido");
    
}else{
    console.error("Token inválido");
    location.assign("login.html");
    
}

document.getElementById("logout").addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    await Auth.logout();
    location.assign("./login.html");
  } catch (error) {
    alert("Error al intentar cerrar sesión");
  }
});
