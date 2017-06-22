// In config/environment.js
let defaultEnv = {
  NAME: 'FirestackDemo'
}

let env = {}
if (process.env.NODE_ENV === 'development') {
  env = require('./development')
}

module.exports = Object.assign({}, defaultEnv, env);