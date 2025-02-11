/**
 * Se crea un objeto donde se le almacena un Map
 * este objeto contendrá los métodos a usar en el index.js
 */
const DiccionarioDeRimas = {
    listaDeRimas: new Map(), //Map clave, valor
  
    /**
     * Se le pasan dos parámetros que son la palabra y la rima
     * Dentro del if se comprueba si la lista de rimas contiene ESA palabra (clave)
     * si la contiene, se busca en la lista de rimas esa palabra (clave) y luego
     * se pushea la rima (valor)
     *
     * Si da el caso en el que ya existe la rima en la palabra asociada, entonces no la añadirá
     * y retornará un mensaje diciendo el problema
     *
     * Sino establece la lista de rimas con la palabra (clave) y un array de rimas (valor)
     * el cual se usará para almacenar cantidades de rimas posibles a esa palabra asociada
     * @param {*} palabraDada
     * @param {*} rima
     */
    agregarRima(palabraDada, rimaDada) {
      /**
       * El uso del this es debido a que listaDeRimas se encuentra
       * en el MISMO objeto en el cual se están haciendo las funciones
       *
       * Por lo tanto es recomendable indicarselo, aunque igualmente podría
       * detectarlo de todas formas
       */
  
      if (this.listaDeRimas.has(palabraDada)) {
        let rimas = this.listaDeRimas.get(palabraDada);
        if (!rimas.includes(rimaDada)) {
          rimas.push(rimaDada);
          console.log(`Rima añadida: ${rimaDada}`);
        } else {
          console.log("La rima ya existe para esta palabra.");
        }
      } else {
        this.listaDeRimas.set(palabraDada, [rimaDada]);
        console.log(`Palabra añadida: ${palabraDada} con la rima: ${rimaDada}`);
      }
    },
  
    /**
     * Se le pasa por parámetro la palabra
     * Dentro del if se comprueba si la listaDeRimas contiene esa palabra (clave)
     * Si la contiene devuelve las rimas (valor) de la palabra dada (clave)
     * Sino retorna un mensaje diciendo el error
     * @param {*} palabraDada
     * @returns
     */
    obtenerRimas(palabraDada) {
      if (this.listaDeRimas.has(palabraDada)) {
        return this.listaDeRimas.get(palabraDada);
      } else {
        return false;
      }
    },
  
    /**
     * Se le pasan dos parámetros que son la palabra y la rima
     * En este if se comprueba si en la lista de rimas existe esa palabra (clave)
     * Si existe se crea una variable rimas donde obtendrá la litsa de rimas
     * de esa palabra (clave) y la posición donde se encuentra esa rima exacta dentro
     * de la lista de rimas (valor)
     *
     * Luego se comprueba en un if que si es distinto de -1 (es decir, que lo ha encontrado)
     * Entonces mediante un splice se elimina el elemento dado
     * Si no se encuentra retornara un mensaje diciendo el problema, y lo mismo si no consigue
     * entrar en el primer if, dando a entender que esa palabra no esta asociada con la lista
     * de rimas
     * @param {*} palabraDada
     * @param {*} rima
     * @returns
     */
    eliminarRima(palabraDada, rima) {
      if (this.listaDeRimas.has(palabraDada)) {
        let rimas = this.listaDeRimas.get(palabraDada);
        let posicion = rimas.indexOf(rima);
  
        if (posicion !== -1) {
          rimas.splice(posicion, 1);
          return (
            "La rima " + rima + " fue eliminada de la palabra " + palabraDada
          );
        } else {
          return "La rima " + rima + " no existe para la palabra " + palabraDada;
        }
      } else {
        return "La palabra " + palabraDada + " no es encuentra en el diccionario";
      }
    },
  
    /**
     * Se le pasa por parámetro la palabra
     * Para dentro de un if borrar la palabra asociada a la lista de rimas
     * Si lo consigue retornará un mensaje diciendo que se ha eliminado del diccionario
     * Sino retornará otro mensaje diciendo que no se ha podido eliminar del diccionario
     * @param {*} palabraDada
     * @returns
     */
    eliminarPalabra(palabraDada) {
      if (this.listaDeRimas.delete(palabraDada)) {
        return "La palabra " + palabraDada + " se ha eliminado del diccionario";
      } else {
        return (
          "La palabra " +
          palabraDada +
          " NO se ha podido eliminar del diccionario"
        );
      }
    },
  
  
  
  
    /**
     * Este método busca en la lista de rimas todas las palabras que contengan la clave
     * y las devuelve en un array
     * @param {*} clave
     * @returns
     */
  
    buscarRimaPorClave(clave) {
      let resultados = [];
  
      this.listaDeRimas.forEach((rimas, palabra) => {
        rimas.forEach((rima) => {
          if (rima.includes(clave)) {
            resultados.push(`${palabra}: ${rima}`);
          }
        });
      });
  
      return resultados.length > 0 ? resultados : 
      `No se encontraron rimas con la clave "${clave}".`;
    },
  
  
  
    /**
     * Este método genera un select con todas las palabras que hay en el diccionario
     * @returns
     */
    generarSelectDePalabras() {
      const select = document.createElement('select');
      select.id = 'selectPalabras';
  
      const optionDefault = document.createElement('option');
      optionDefault.value = '';
      optionDefault.textContent = 'Selecciona una palabra';
      select.appendChild(optionDefault);
  
      this.listaDeRimas.forEach((_, palabra) => {
          const option = document.createElement('option');
          option.value = palabra;
          option.textContent = palabra;
          select.appendChild(option);
      });
  
      return select;
  }};
  