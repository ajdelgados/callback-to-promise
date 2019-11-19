# De callback a async

Los callbacks, promise y async/await causa confusión cuando un desarrollador se encuentra aprendiendo JavaScript, con este post trataré de explicar los conceptos básicos y un ejemplo de como se puede transformar un callback en promesa para usarse dentro de una función async.

#### Conceptos básicos para la explicación

Callback es una función en JavaScript para ser ejecutada por otra función la cual se pasa como argumento y la declaración async en una función permite que esta opere asincrónamente a través de eventos usando promesas para devolver sus resultados. Una promesa es un objeto que devuelve el resultado de una operación asincrona (callback).

#### Iniciemos con callback

Un callback se puede hacer con el módulo request, para hacer una llamada a un API y poder ver el efecto del callback.

```javascript
const request = require('request');

const options = {
  method: 'GET',
  url: 'https://aws.random.cat/meow'
};

request(options, (error, response, body) => {
  if(error) console.log("Error form callback", error);
  else console.log("Data from callback", body);
});

console.log("Finished script!");
```
Con el código anterior, vemos que se ejecuta el script principal completamente y luego el resultado de la llamada al API.

#### Transformando un callback en promesa

En la sintaxis de un objeto promesa es importante los argumentos resolve y reject de la función que se indica para iniciarla, donde en resolve se ejecuta la resolución exitosa del callback y en reject el error.

```javascript
let promiseResponse = new Promise((resolve, reject) => {
  request(options, (error, response, body) => {
    if(error) reject(error);
    else resolve(body);
  });
});
```

En el ejemplo, creamos promiseResponse como una promesa e indicamos que nos debe devolver en el caso de éxito o fallo con resolve y reject.

#### Esperando la resolución de la promesa con async/await

La espera de la ejecución de la promesa se debe hacer con el operador await, para usarlo debe ser dentro de una función async.

```javascript
const request = require('request');

const options = {
  method: 'GET',
  url: 'https://aws.random.cat/meow'
};

request(options, (error, response, body) => {
  if(error) console.log("Error form callback", error);
  else console.log("Data from callback", body);
});

async function execute() {
  let promiseResponse = new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if(error) reject(error);
      else resolve(body);
    });
  });
  
  console.log("Promise response", await promiseResponse);
  console.log("Finished script!");
}

execute();
```
Al ejecutar el script, se podrá notar la diferencia entre hacer un callback y la espera de la respuesta de la promesa con el async/await. En diferentes ejecuciones la impresión del callback puede ser antes de finalizar el script o luego, mientras la respuesta de la promesa siempre se ejecuta antes de la ejecución de todo el script.

#### Referencias

* [Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
