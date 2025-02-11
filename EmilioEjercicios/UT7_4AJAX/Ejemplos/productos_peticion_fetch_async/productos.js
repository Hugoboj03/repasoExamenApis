const SERVER = 'http://localhost:5000';
let productos = [];
/**
 * Ejemplo de petición FETCH gestionando las promesas con async/await
 */

/**
 * La API Fetch permite realizar una petición Ajax genérica que directamente devuelve una promesa.
 * Encapsula en una función --fetch-- todo el código que se repite siempre en una petición AJAX: 
 *      - crear la petición, hacer el open, el send, escuchar los eventos, …
 * 
 * Se ha de tener en cuenta:
 * 
 *  1. fetch devuelve los datos “en crudo”: 
 *      - Si la respuesta está en formato JSON habrá con convertirlos. 
 *        Dispone de un método (.json()) que hace el JSON.parse. Este método devuelve una nueva promesa.
 * 
 *  2. fetch llama a resolve siempre que el servidor conteste, sin comprobar si la respuesta es de éxito 
 *     (200, 201, …) o de error (4xx, 5xx). 
 *      - Siempre se resolverá la promesa, excepto si se trata de un error de red y el servidor no responde; 
 *        por lo que, se deberá verificar la propiedad ok.
 * 
 *      La respuesta devuelta por fetch() tiene las siguientes propiedades y métodos:
 *      - status: el código de estado devuelto por el servidor (200, 404, …)
 *      - statusText: el texto correspondiente a ese código (Ok, Not found, …)
 *      - ok: booleano que vale true si el status está entre 200 y 299 y false en caso contrario
 *      - json(): devuelve una promesa que se resolverá con los datos de la respuesta convertidos a un objeto 
 *      - otros métodos para convertir los datos según el formato que tengan: text(), blob(), formData(), … 
 *        Todos devuelven una promesa con los datos de distintos formatos convertidos.
 *      
 *  3. Para peticiones que no sean GET la función fetch() admite un segundo parámetro 
 *     con un objeto con la información a enviar en la petición HTTP.
 */

// Petición GET (por defecto) con Fetch
async function getProductos() {
    try {
        const resp = await fetch(`${SERVER}/productos`); // promesa fetch
        // si el status no está entre 200 y 299, se produce error
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`); 
        // JSON a Objeto
        const json = await resp.json(); // promesa .json()
        console.log(json);
        productos = json.data;
        replaceProductos();
    } catch (error) {
        console.error("Fallo en la obtención de productos:", error);
    }
}

// Insertar producto con Fetch
async function postProducto(producto) {
    try {
        // Fetch con segundo parámetro con la información
        const resp = await fetch(`${SERVER}/productos`, {
            method: 'POST', // Método
            body: JSON.stringify(producto), // pasamos producto de Objeto a JSON en el body
            headers: { // Indicamos encabezados
                'Content-Type': 'application/json'
            }
        });
        // si el status no está entre 200 y 299, se produce error
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        if (resp.status !== 204) { // Si la respuesta tiene contenido: 204 No Content
            // JSON a Objeto
            const json = await resp.json(); // promesa .json()
            if (json) {
                console.log(json);
                productos.push(json.data);
                replaceProductos();
                document.getElementById("preview").src = "";
                let form = document.getElementById("addProducto");
                form.reset();
            }
        }
    } catch (error) {
        console.error("Fallo insertando el producto:", error);
    }
}

// Borrar producto con Fetch
async function deleteProducto(prod) {
    try {
        const resp = await fetch(`${SERVER}/productos/${prod.id}`, {
            method: 'DELETE'
        });
        // si el status no está entre 200 y 299, se produce error
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        if(resp.status == 200) { // Borrado
            let tr = document.getElementById(`p${prod.id}`);
            tr.parentElement.removeChild(tr);
            let index = products.indexOf(prod);
            if(index >= 0) products.splice(index, 1);
        }
    } catch (error) {
        console.error("Fallo insertando el producto:", error);
    }
}
/**
 * Gestión DOM
 */
function replaceProductos() {
    let container = document.getElementById("productoContainer");
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    productos.forEach(p => {
        appendProducto(p, container);
    });

}

function appendProducto(p, container) {
    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerText = p.name;

    let tdDesc = document.createElement("td");
    tdDesc.innerText = p.description;

    let tdPhoto = document.createElement("td");

    let img = document.createElement("img");
    img.src = `${p.photo}`;
    tdPhoto.appendChild(img);

    let tdDelete = document.createElement("td");
    let buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Delete";
    tdDelete.appendChild(buttonDelete);

    buttonDelete.addEventListener('click', event => {
        deleteProducto(p);
    });

    tr.appendChild(tdPhoto);
    tr.appendChild(tdName)
    tr.appendChild(tdDesc);
    tr.appendChild(tdDelete);
    tr.id = `p${p.id}`;
    container.appendChild(tr);

}
/**
 * Gestión Eventos
 */
document.addEventListener("DOMContentLoaded", event => {
    getProductos();

    let form = document.getElementById("addProducto");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let data = {
            name: form.name.value,
            description: form.desc.value,
            photo: document.getElementById("preview").src
        }
        console.log("Enviado: ", data);
        postProducto(data);
    });


    form.image.addEventListener('change', () => {
        let file = form.image.files[0];
        let reader = new FileReader();

        if (file) { // File has been selected (convert to Base64)
            reader.readAsDataURL(file);
        }

        reader.addEventListener("load", () => { //Converted into Base64 event (async)
            document.getElementById("preview").src = reader.result;
        }, false);
    });

    document.getElementById("orderName").addEventListener('click', e => {
        productos.sort((p1,p2) => p1.name.localeCompare(p2.name));
        replaceProductos();
    });

});

