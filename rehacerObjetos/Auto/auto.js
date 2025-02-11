class Auto{

    #encendido;
    #velocidad;
    #marca;
    #modelo;
    #patente;

    constructor(marca, modelo, patente){
        this.#encendido = false;
        this.#velocidad = 0;
        this.#marca = marca;
        this.#modelo = modelo;

    }

    arrancar(){

        if(this.#encendido == false){
            this.#encendido = true;
            console.log("Has encendido el euto");
        }else{
            console.log("El auto ya está encendido");
        }
    }

    apagar(){
        if(this.#velocidad > 0){
            console.log("No puedes apagar el auto mientras está en movimiento");  
        }else{
            if(this.#encendido == true){
                this.#encendido = false;
                console.log("Has apagado el auto");
            }
        }
        
    }

    acelerar(){
        if(this.#encendido == true){
            this.#velocidad = this.#velocidad + 10;
        }
    }

}