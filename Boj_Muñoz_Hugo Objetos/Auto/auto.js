class auto{

    #encendido;
    #velocidad;
    #marca;
    #modelo;
    #patente;

    constructor(marca, modelo, patente){
        this.#marca = marca;
        this.#modelo = modelo;
        this.#patente = patente;
        this.#velocidad = 0;
        this.#encendido = false;
    }


    arrancar(){
        if(!this.#encendido){
            this.#encendido = true;
            console.log("Has arrancado el coche.");
        } else {
            console.log("El coche ya esta arrancado.");
        }
    }

    apagar(){
        if(this.#encendido && this.getVelocidad() == 0){
            this.#encendido = false;
            console.log("Has apagado el cohe");
        } else {
            console.log("El coche ya esta apagado.");
        }
    }

    acelerar(){
        if(this.#encendido){
            this.#velocidad += 10;
            console.log("Velocidad actual "+this.#velocidad);
        }
    }

    desacelerar(){
        if(this.#encendido){
            if(this.getVelocidad() == 0){

                console.log("El coche ya esta inmovil");

            }else{
                this.#velocidad -= 10;
                console.log("Velocidad actual "+this.#velocidad);
            }
            
        }
    }

    toString(){
        return `${this.#marca}, ${this.#modelo}, ${this.#patente}`;
    }

    getVelocidad(){
        return this.#velocidad;
    }



}

const miauto = new auto('Toyota', 2021, 'ABC123');

console.log(miauto.toString());

miauto.arrancar();

miauto.acelerar();

console.log(miauto.getVelocidad());

miauto.desacelerar();

console.log(miauto.getVelocidad());

miauto.apagar();