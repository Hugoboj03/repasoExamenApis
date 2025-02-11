/**
 * Recorrido de un Array
 */
// Función que recorre un array y ejecuta un callback con cada elemento
function recorrerArray(arr, callback) {
  for (let element of arr) {
    callback(element);  // Llamar al callback (procesarElemento) con el elemento actual
  }
}

// Callback que procesa cada elemento del array
function procesarElemento(elemento) {
  console.log("Elemento procesado:", elemento);
}

const numeros = [1, 2, 3, 4, 5];
// Llamada a la función con un array y el callback
recorrerArray(numeros, procesarElemento);

console.log('Otra llamada:');
// Llamada forEach con el elemento
numeros.forEach(procesarElemento);

// Algo que se suele realizar con forEach:
numeros.forEach((element, index) => {
  console.log(`Elemento procesado en ${index}: ${element}`);
});

//-------------------------.---.---.-------------------------

/**
 * Temporizador mediante la función setTimeout(callback, time).
 */

// Función que ejecuta el callback después de un tiempo
function hacerTarea(callback) {
  setTimeout(() => {
    console.log("Tarea completada!");
    callback();  // Llamamos al callback después de que la tarea se complete
  }, 2000);  // Esperar 2 segundos
}

// Callback que se ejecuta después de completar la tarea
function tareaFinalizada() {
  console.log("Callback ejecutado: La tarea está lista.");
}

// Llamar a la función y pasar el callback
hacerTarea(tareaFinalizada);

//-------------------------.---.---.-------------------------

/**
 * El último console.log() del código se ejecuta primero.
 * El setTimeout(), aunque se ejecuta antes, pone en espera a la función callback, 
 * que se ejecutará cuando se cumpla una cierta condición (2 segundos).
 */
setTimeout(() => {
  console.log("Código asíncrono.");
}, 2000);

console.log("Código síncrono.");

/**
 * Código asíncrono y no bloqueante: el programa no se queda bloqueado 
 * esperando a que terminen los 2 segundos y se ejecute la función callback, 
 * sino que continúa con programa para luego volver y ejecutar el callback; 
 * realizando tareas de forma asíncrona.
 */

/**
 * Desventajas: Callback Hell o Pyramid of Doom
 * - el código es algo caótico
 * - gestionar la asincronía varias veces en una misma función (estructura anidada)
 */

const task = (name, time, callback) => {
  console.log(`Iniciando ${name}...`);
  setTimeout(() => {
    callback();
  }, time);
}

task( "tarea 1", 3000, () => {
  console.log("Tarea 1 completada.");
  task( "tarea 2", 2000, () => {
    console.log("Tarea 2 completada.");
    task( "tarea 3", 5000, () => {
      console.log("Tarea 3 completada.");
    });
  });
});
