//---------------------- JSON a Objeto ------------------ //

/**
 * La acción de convertir JSON a objeto Javascript se le suele denominar parsear. 
 * Es una acción que analiza un string que contiene un JSON válido 
 * y devuelve un objeto Javascript con dicha información correctamente estructurada.
 * - JSON.parse(str): Convierte una cadena de texto JSON válida en un objeto JavaScript.
 */
const json = `{
  "name": "Marina",
  "level": 5,
  "maxLevel": 20,
  "fuerza": 15,
  "alive": true,
  "habilidades": ["terca", "tozuda", "concienzuda"],
  "attributes": {
    "health": 100,
    "stamina": 80
  }
}`;

let user = JSON.parse(json);
console.log(user);

  //---------------------- Objeto a JSON ------------------ //
  /**
   * Convertir un objeto Javascript a JSON se puede realizar facilmente haciendo uso 
   * del método JSON.stringify() y sus variantes:
   * - JSON.stringify(obj): Convierte un objeto JavaScript en una cadena JSON.
   * - JSON.stringify(obj, props): Filtrando y manteniendo las propiedades especificadas.
   * - JSON.stringify(obj, props, spaces): Indentando el JSON con el número de espacios especificados.
   */

user = {
  name: "Marina",
  level: 10,
  maxLevel: 20,
  fuerza: 99,
  alive: true,
  habilidades: ["conversación", "programación"],
  attributes: {
    health: 200,
    stamina: 180
  },
  talk: function () {
    return "Hola!";
  },
};

// Recuerda que existen tipos de datos no soportados por JSON, como las funciones; por lo que si intentamos 
// convertir un objeto que los contenga, JSON.stringify() no fallará, 
// pero devolverá un string omitiendo esas propiedades:

console.log(JSON.stringify(user)); // '{"name":"Marina","level":10,"maxLevel":20,"fuerza":99,"alive":true,"habilidades":["conversación","programación"],"attributes":{"health":200,"stamina":180}}'  

console.log(JSON.stringify(user, ["level"])); // '{"level":10}'
console.log(JSON.stringify(user, ["name", "fuerza"])); // '{"name":"Marina","fuerza":99}'
console.log(JSON.stringify(user, [])); // '{}' -- nada
console.log(JSON.stringify(user,null)); // -- todo


console.log(JSON.stringify(user, null, 2));
console.log(JSON.stringify(user, ["name", "fuerza"], 8));
  