'use strict'

const _express = _interopRequireDefault(require('express'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
const app = (0, _express.default)()
app.listen(4000)
console.log('El servidor se ha inicializado en el puerto: ', 4000)
