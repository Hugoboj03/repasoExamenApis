class carrito {



    productos = [];

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    /**
     * Obtenemos el producto deseado del array buscando por su id y
     * lo actualizamos usando su set
     * @param {*} id 
     * @param {*} cantidad 
     */
    actualizarCantidadProducto(id, cantidad) {
        let producto = this.productos.find(p => p.id === id);

        producto.setCantidad(cantidad);

    }

    /**
     * Elimina un producto del array filtrando por su id
     * @param {*} id 
     */
    eliminarProducto(id) {
        this.productos = this.productos.filter(p => p.id !== id);
    }

    /**
     * Calcula la suma del precio de los productos
     * Tanto de los qu tienen iva aplicandose,
     * como los que no tienen
     * @returns 
     */

    calcularTotal() {

        let precioTotal = 0;

        this.productos.forEach(element => {

            if (element.getTieneImpuesto()) {
                //Usamos Number para redondear a 2 decimales
                precioTotal = precioTotal + Number((element.getPrecio() * 1.1) * element.getCantidad().toFixed(2));
            } else {
                precioTotal = precioTotal + (element.getPrecio() * element.getCantidad());
            }

        });

        return precioTotal;

    }

    /**
     * Calcula solo la cantidad de dinero de todos los ivas
     * Si una manzana de 10 euros y un pan de 8 tienen iva devolvera 1,8$
     * @returns 
     */
    calcularImpuestoTotal() {

        let precioTotal = 0;

        this.productos.forEach(element => {

            if (element.getTieneImpuesto()) {
                //Usamos Number para redondear a 2 decimales
                precioTotal = precioTotal + Number(((element.getPrecio() * 0.1) * element.getCantidad()).toFixed(2));
            }

        });

        return precioTotal;

    }


    /**
     * Calcula la cantidad de dinero de todos los productos sin aplicar ningun iva
     * @returns 
     */
    subTotalSinImpuestos() {
        let precioTotal = 0;

        this.productos.forEach(element => {

            precioTotal = precioTotal + (element.getPrecio() * element.getCantidad());

        });

        return precioTotal;
    }


    /**
     * Obtiene la cantidad de productos en el carrito
     * @returns 
     */
    obtenerCantidadTotal() {
        return this.productos.length;
    }

    toString() {
        let texto = "";

        this.productos.forEach(element => {
            texto = texto + element.toString() + "\n";
        });

        texto = texto + "\n" + "Subtotal de todos los productos sin sumar impuesto: $" +this.subTotalSinImpuestos();

        texto = texto + "\n" + "Suma impuestos: $" + this.calcularImpuestoTotal();

        texto = texto + "\n" + "Total final: $" + (this.calcularImpuestoTotal()+this.subTotalSinImpuestos());

        return texto;
    }




}



// Ejemplo de uso:
const producto1 = new producto('Manzana', 1.5, 10, true);
const producto2 = new producto('Pan', 2, 5, false);
const carro = new carrito();
carro.agregarProducto(producto1);
carro.agregarProducto(producto2);
console.log(carro.toString());
console.log('Total con impuestos:', carro.calcularTotal());
console.log('Total impuestos:', carro.calcularImpuestoTotal());
console.log('Cantidad total de ítems:', carro.obtenerCantidadTotal());
carro.actualizarCantidadProducto(producto1.getId(), 20);
console.log(carro.toString());
carro.eliminarProducto(producto2.getId());
console.log(carro.toString());