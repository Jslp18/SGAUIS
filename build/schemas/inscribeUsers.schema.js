"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inscribeUsersSchema = void 0;
var _zod = _interopRequireDefault(require("zod"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var inscribeUsersSchema = exports.inscribeUsersSchema = _zod["default"].object({
  codigo: _zod["default"].string({
    required_error: 'El código es requerido.'
  }).length(7, {
    message: 'La longitud del código es de 7 caracteres.'
  }).refine(function (codigo) {
    return !isNaN(Number(codigo));
  }, {
    message: 'El código debe ser númerico.'
  })
});
//# sourceMappingURL=inscribeUsers.schema.js.map