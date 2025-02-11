function sincrona() { return 42; }
async function asincrona() { return 42; }

console.log(sincrona());   // 42
console.log(asincrona());  // Promise <fulfilled>: 42

//-------------------------------------------------------------
/**
 * sumaPromesa: genera una nueva promesa que realiza la suma 
 * de dos números pasados por parámetro a los dos segundos
 */
function sumaPromesa(n1, n2) {
    return new Promise((resolve, reject) => {
        // siempre será aceptada; por lo que en función de lo que reciba, realizará un operación u otra
        setTimeout(() => resolve(n1 + n2),2000);
    });
}

/**
 * Consumo con 'thennables':
 * Se pueden encadenar promesas: Sumar 4 + 8 + 6 + 10
 */

sumaPromesa(4,8) // primera
.then(r => sumaPromesa(r, 6)) // segunda
.then(r => sumaPromesa(r, 10).finally(() => console.log("Esta es la última promesa"))) // tercera
.then(r => console.log(r))
.catch(error => console.error('Error: ' + error))
.finally(() => console.log("Terminado."));

//-------------------------------------------------------------

/**
 * 
 * Función asíncrona para sumar 4 + 8 + 6 + 10 usando async/await.
 * Cualquier función que realice un await pasa a ser asíncrona, ya que no se ejecuta al instante toda ella, sino que se espera un tiempo. 
 * Para indicarlo debemos anteponer la palabra async a su declaración function:
 * 
 * - La palabra reservada async se pone delante de una función e indica que esa función va a devolver una promesa. 
 * - La palabra reservada await se pone delante de una llamada a una promesa y le indica a Javascript que espere a que 
 * esa promesa se resuelva antes de continuar con la ejecución del código.
 * 
 */
async function sumarAsync() {
    // En este caso, el tratamiento de errores se hace con un try/catch:
    try {
        // Usando async/await nuestro código se asemeja a un código síncrono ya que no continuan ejecutándose las instrucciones que hay después de un await hasta que esa petición se ha resuelto. Podemos anteponer un await a cualquier llamada a una función asíncrona, como una promesa, un setTimeout, …
        const resultado1 = await sumaPromesa(4, 8); // primera
        const resultado2 = await sumaPromesa(resultado1, 6); // segunda
        const resultadoFinal = await sumaPromesa(resultado2, 10); // tercera
        console.log("Aquí finalizan las promesas");
        console.log(resultadoFinal); // Muestra el resultado final
    } catch (error) {
        console.error('Error:', error);
    } finally {
        console.log("Terminado.");
    }
}

// Al añadir la palabra clave async a una función, la convertimos en asíncrona; por lo que a su vez, está devolviendo su propia promesa. 
// Si quieres obtener el valor final, utiliza nuevamente await:

sumarAsync(); // Llama a la función asíncrona

/**
 * 
 * Ejemplo Sencillo de 
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function
 * 
 */
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function add1(x) {
  const a = await resolveAfter2Seconds(20); // 'bloquea' 
  const b = await resolveAfter2Seconds(30); // 'bloquea' 
  return x + a + b; // resuelve
}

add1(10).then((v) => {
  console.log("Add1: " + v); // prints 60 after 4 seconds.
});

async function add2(x) {
  const p_a = resolveAfter2Seconds(20);
  const p_b = resolveAfter2Seconds(30);
  return x + (await p_a) + (await p_b);
}

add2(10).then((v) => {
  console.log("Add2: " + v); // prints 60 after 2 seconds.
});

// Async/await + .then()
// NO ES NECESARIO utilizar una misma estrategia siempre, se pueden combinar.