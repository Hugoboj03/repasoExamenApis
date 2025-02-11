class Calculadora{

    #resultado;

    constructor(){
        this.#resultado = 0;
    }

    #validarNumero(num){

        if(isNaN(num)){
            return true;
        }else{
            return false;
        }

    }

    sumar(num){

        if(this.#validarNumero(num)){
            
            throw new Error("El número introducido no es válido");
        }else{

            this.#resultado = this.#resultado + num;

            return this.#resultado;

        }

    }

    restar(num){
        
        if(this.#validarNumero(num)){
            throw new Error("El número introducido no es válido");
        }else{
            this.#resultado = this.#resultado - num;

            return this.#resultado;
        }
    }

    multiplicar(num){
        
        if(this.#validarNumero(num)){
            throw new Error("El número introducido no es válido");
        }else{
            this.#resultado = this.#resultado * num;

            return this.#resultado;
        }
    }

    dividir(num){
        if(this.#validarNumero(num)){
            throw new Error("El numero introducido no es valido");
        }else{
            if(num == 0){
                throw new Error("No se puede dividir entre 0");
            }else{
                this.#resultado = this.#resultado / num;

                return this.#resultado;
            }
        }
    }

    reiniciar(){
        this.#resultado = 0;
    }

    obtenerResutlado(){
        return this.#resultado;
    }


}

let cal = new Calculadora();

console.log(cal.sumar(5));

console.log(cal.restar(3));

console.log(cal.multiplicar(2));

console.log(cal.dividir(4));

console.log(cal.obtenerResutlado());