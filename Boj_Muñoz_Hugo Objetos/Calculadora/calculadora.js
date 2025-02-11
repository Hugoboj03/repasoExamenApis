class calculadora {


    #resultado;

    constructor() {
        this.#resultado = 0;

    }

    sumar(num) {

        if (this.validar(num)) {

            this.#resultado += num;

            return this.#resultado;

        } else {
            throw new Error("El número introducido no es válido");
        }


    }

    restar(num) {

        if (this.validar(num)) {

            this.#resultado -= num;

            return this.#resultado;

        } else {
            throw new Error("El número introducido no es válido");
        }


    }

    multiplicar(num) {

        if (this.validar(num)) {

            this.#resultado *= num;

            return this.#resultado;

        } else {
            throw new Error("El número introducido no es válido");
        }


    }

    dividir(num) {

        if (this.validar(num)) {
            if (this.num == 0) {

                throw new Error("no se puede dividir entre 0");

            } else {
                this.#resultado /= num;
                return this.#resultado;
            }
        } else {
            throw new Error("El número introducido no es válido");
        }




    }

    obtenerResultado() {
        return this.#resultado;
    }

    reiniciar() {
        this.#resultado = 0;
        return this.#resultado;
    }

    validar(num) {
        if (isNaN(num)) {
            return false;
        } else {
            return true;
        }
    }




}

let cal = new calculadora();

console.log('Suma:', cal.sumar(10));

console.log('Resta:', cal.restar(5));

console.log('Multiplicación:', cal.multiplicar(3));

console.log('División:', cal.dividir(5));

console.log('Resultado:', cal.obtenerResultado());

console.log('Reiniciar:', cal.reiniciar());