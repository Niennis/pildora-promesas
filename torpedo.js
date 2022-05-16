// CALLBACKS
const readFileCallback = (fileName, callback) => {
  return fs.promises.readFile(fileName, 'utf-8')
    .then(string => callback(string, fileName))
    .catch(err => 'errorsh')
}

const extractLinks = (string, file, callback) => {
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm

  const matches = string.match(regexMdLinks)
  const singleMatch = /\[([^\[]+)\]\((.*)\)/
  const arr = matches.map((link) => {
    let text = singleMatch.exec(link)
    return ({
      href: text[2],
      text: text[1],
      file,
    })
  })
  return callback(arr)
}

const validateHttp = (arr) => {
  return arr.map(item => {
    return ({ ...item, status: 'algunEstado' })
  })
}

readFileCallback('prueba/hola.md', (response) => {
  return extractLinks(response, 'prueba/hola.md', (array) => {
    return validateHttp(array)
  })
})
  .then(resp => console.log(resp))





  // PROMESAS
  const fs = require('fs');
  const path = require('path');
  
  const readFile = (file,) => {
    return new Promise((resolve, reject) => {
      fs.promises.readFile(file, 'utf-8')
        .then(result => resolve(result))
        .catch(err => reject('errorsh'))
    });
  };
  
  const extractLinks = (string, file) => {
    return new Promise((resolve, reject) => {
      const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
  
      const matches = string.match(regexMdLinks)
      const singleMatch = /\[([^\[]+)\]\((.*)\)/
      const arr = matches.map((link) => {
        let text = singleMatch.exec(link)
        return ({
          href: text[2],
          text: text[1],
          file,
        })
      })
      resolve(arr)
    })
  }
  
  const validateHttp = (arr) => {
    return new Promise((resolve, reject) => {
      const arrValidated = arr.map(item => {
        return({...item, status: 'algúnEstado'})
      })
      resolve(arrValidated)
    })
  }
  
  // readFile('prueba/hola.md')
  //   .then(resp => extractLinks(resp, 'prueba/hola.md')
  //     .then(data => validateHttp(data)
  //       .then(final => console.log('final', final))))
  //   .catch(err => err)
  
  // readFile('prueba/hola.md')
  //   .then(resp => extractLinks(resp, 'prueba/hola.md'))
  //   .then(data => validateHttp(data))
  //   .then(final=> console.log(final))
  //   .catch(err => console.log(err))
  
  const absoluta = (ruta) => {return new Promise((resolve) =>  {
    path.isAbsolute(ruta) ? resolve(ruta) : resolve(path.resolve(ruta))
  })}
  
  const extensionMD = (ruta) => new Promise((resolve, reject) => {
    resolve(path.extname(ruta))
  })
  
  Promise.all([absoluta('prueba/hola.md'), extensionMD('prueba/hola.md')])
    .then(resp => console.log('resp', resp))

