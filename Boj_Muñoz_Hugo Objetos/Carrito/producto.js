class producto{


    #id = 0;
    #nombre;
    #precio;
    #cantidad;
    #tieneImpuesto;

    

    constructor(nombre, precio, cantidad, tieneImpuesto){
        this.id = this.incrementarId();
        this.#nombre = nombre;
        this.#precio = precio;
        this.#cantidad = cantidad;
        this.#tieneImpuesto = tieneImpuesto;

    }

    getId(){
        return this.id;
    }

    getNombre(){
        return this.#nombre;
    }

    setNombre(nombre){
        this.#nombre = nombre;
    }

    getPrecio(){
        return this.#precio;
    }

    setPrecio(precio){
        if(precio <= 0){
            console.log("El precio no puede ser menor o igual a 0");
        }else{
            this.#precio = precio;
        }
        
    }

    getCantidad(){
        return this.#cantidad;
    }

    setCantidad(cantidad){
        if(cantidad <= 0){
            console.log("La cantidad no puede ser menor o igual a 0");
        }else{
            this.#cantidad = cantidad;
        }
        
    }

    getTieneImpuesto(){
        return this.#tieneImpuesto;
    }

    setTieneImpuesto(tieneImpuesto){
        this.#tieneImpuesto = tieneImpuesto;
    }



    toString(){
        return `Nombre: ${this.#nombre}, Precio: ${this.#precio}, Cantidad: ${this.#cantidad}`;
    }


    /**
     * El id se generara aleatoriamente
     * @returns 
     */

    incrementarId(){
        return Math.random() * (100 - 1) + 1;
    }




}