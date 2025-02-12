document.addEventListener("DOMContentLoaded", evnet => {

    const SERVER = "http://localhost:5001";

    let eventos = [];

    getEventos();

    async function getEventos(){

        try{

            const response = await fetch(`${SERVER}/eventos`);

            if(!response.ok){
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const json = await response.json();

            eventos = json.data;

            console.log(eventos);

            replaceEventos();

        }catch(error){

        }
        
    }

    function replaceEventos(){

        let container = document.getElementById("eventsContainer");
        while(container.firstChild) {
            container.removeChild(container.firstChild);
        }
        eventos.forEach(e => {
            appendEventos(e, container);
        });

    }

    function appendEventos(e, container){
        let nuevoEvento = document.createElement("div");
        nuevoEvento.className = "card";

        let img = document.createElement("img");
        img.src = `${e.imagen}`;
        img.className = "card-img-top";
        nuevoEvento.append(img);

        let cardBody = document.createElement("div");
            cardBody.className = "card-body";
                let h4 = document.createElement("h4");
                h4.className = "card-title";
                h4.textContent = e.nombre;
            cardBody.append(h4);
                let p = document.createElement("p");
                p.className = "card-text";
                p.textContent = e.description;
            cardBody.append(p);
        nuevoEvento.append(cardBody);


        // Creo aqui la fecha, porque al crearla arriba da error
        let fechaAntigua = new Date(e.fecha);

        let dia = fechaAntigua.getDay();
        let mes = fechaAntigua.getMonth();
        let anyo = fechaAntigua.getFullYear();

        let nuevaFecha = dia + "/" + mes + "/" + anyo;

        let cardFooter = document.createElement("div");
            cardFooter.className = "card-footer";
                let small = document.createElement("small");
                small.className = "text-muted";
                small.textContent = nuevaFecha;
                    let span = document.createElement("span");
                        span.className = "float-right";
                    span.textContent = e.precio + " €";
                small.append(span);
            cardFooter.append(small);
        nuevoEvento.append(cardFooter);

        container.append(nuevoEvento);
    }
});