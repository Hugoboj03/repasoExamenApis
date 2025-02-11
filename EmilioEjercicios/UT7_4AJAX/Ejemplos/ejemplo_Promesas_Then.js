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

let result = sumaPromesa('es siempre aceptada ', 5); 
/**
 * Cuando la promesa es aceptada, saca el resultado por consola
 */
result.then(result => console.log(result)).finally(() => console.log("sumaPromesa cumplió su promesa"));; 

// -----------------------------------------------------------------------
function sumaPositivosPromesa(n1, n2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(n1 < 0 || n2 < 0) {
                // La promesa NO se cumple --> es rechazada
                reject('Los números no pueden ser negativos'); 
            } else {
                // La promesa se cumple --> es aceptada
                resolve(n1 + n2);
            }
        },2000);
    });
}
// sin tiempo de espera y sin new
function sumaPositivosPromesa2(n1, n2) {
    if(n1 < 0 || n2 < 0) {
        return Promise.reject('Los números no pueden ser negativos');
    } else {
        return Promise.resolve(n1 + n2);
    }
};

// Tratamiento de errores con catch después de then:
sumaPositivosPromesa(-3, 4)
.then(r => console.log(r)) // función que se realiza si la promesa es aceptada
.catch(error => console.error('Error: ' + error)) // función que se realiza si es rechazada
.finally(() => console.log("sumaPositivosPromesa cumplió su promesa"));

sumaPositivosPromesa2(5, 4)
.then(r => console.log(r))
.catch(error => console.error('Error: ' + error))
.finally(() => console.log("sumaPositivosPromesa2 cumplió su promesa"));

console.log("1. ejecutará sumaPositivosPromesa2 que no tiene setTimeout, con resultado 9");
console.log("2. sumaPromesa con setTimeout de 2 segundos, que realizará una concatenación");
console.log("3. sumaPromesaPositivos con setTimeout de 2 segundos, que dará Error");

/**
 * Se pueden encadenar promesas: Sumar 4 + 8 + 6 + 10
 */

sumaPromesa(4,8) // primera
.then(r => sumaPromesa(r, 6)) // segunda
.then(r => sumaPromesa(r, 10).finally(() => console.log("Esta es la última promesa"))) // tercera
.then(r => console.log(r))
.finally(() => console.log("Terminado."));

console.log("4. Promesas encadenadas - NO es una película!"); // Una vez que llega aquí, empieza a resolver las promesas

