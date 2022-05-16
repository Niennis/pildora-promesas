const fs = require('fs');

const readFileCallback = (file, callback) => {
  return fs.promises.readFile(file, 'utf-8')
    .then(string => callback(string))
    .catch(() => 'lanzó error')
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
    return ({
      href: item.href,
      text: item.text,
      file: item.file,
      status: 'status',
      ok: 'ok/fail'
    })
  })
}

readFileCallback('prueba/hola.md', (response) => {
  return extractLinks(response, 'prueba/hola.md', (array) => {
    return validateHttp(array)
  })
})
.then(final => console.log('final', final))