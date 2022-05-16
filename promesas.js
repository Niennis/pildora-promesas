const fs = require('fs');
const path = require('path');

const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.promises.readFile(file, 'utf-8')
      .then(resp => resolve(resp))
      .catch(() => reject('Error del readfile'))
  })
}

const extractLinks = (string, file) => {
  return new Promise((resolve, reject) => {
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm; // []()
    const matches = string.match(regexMdLinks)
    if (matches === null) {
      reject('No encontró links')
    } else {
      const singleMatch = /\[([^\[]+)\]\((.*)\)/
      // {  [](), [], () ]
      const arr = matches.map((link) => {
        let text = singleMatch.exec(link)
         const obj = {
          href: text[2],
          text: text[1],
          file,
        }
        return obj;
      })
      // sale un array de objetos
      resolve(arr)
    }
  })
}

const validateHttp = arr => {
  // arr es el array de objeto
  return new Promise((res, rej) => {
    const arrayValidado = arr.map(link => {
      return ({
        href: link.href,
        text: link.text,
        file: link.file,
        status: 'status',
        ok: 'ok/fail'
      })
    })
    res(arrayValidado)
  })
}

// ANIDADO
/* readFile('./prueba/hola.md')
  .then(string => {
    extractLinks(string, './prueba/hola.md')
      .then(array => {
        validateHttp(array)
          .then(respuesta => console.log('links validados', respuesta))
          .catch(error => console.log('error de validate'))
      })
      .catch(error => console.log('error del extractlinks', error))
  })
  .catch(error => console.log('error del readfile', error))

 */
// ENCADENADO
readFile('./prueba/hola.md')
  .then(string => {
    return extractLinks(string, './prueba/hola.md')
  })
  .then(array => {
    return validateHttp(array)
  })
  .then(respuesta => console.log('final', respuesta))
  .catch(error => console.log('error:', error))





  const absoluta = (ruta) => {
    return new Promise((resolve) =>  {
      path.isAbsolute(ruta) ? resolve(ruta) : resolve('Ruta absoluta: ' + path.resolve(ruta))
  })}

  const extensionMD = (ruta) => new Promise((resolve) => resolve('Extensión de archivo: '+ path.extname(ruta)))



/*   Promise.all([absoluta('./prueba/hola.md'), extensionMD('./prueba/hola.md')])
    .then(resp=> console.log('resp', resp)) */