"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginSchema = void 0;
var _zod = require("zod");
var loginSchema = exports.loginSchema = _zod.z.object({
  codigo: _zod.z.string({
    required_error: 'El código es requerido.'
  }).length(7, {
    message: 'La longitud del código debe ser 7 caracteres.'
  }).refine(function (codigo) {
    return !isNaN(Number(codigo));
  }, {
    message: 'El código debe ser númerico.'
  }),
  password: _zod.z.string({
    required_error: 'La contraseña es requerida.'
  }).min(14, {
    message: 'La contraseña debe contener mínimo 14 caracteres.'
  }).max(32, {
    message: 'La contraseña debe contener máximo 32 caracteres.'
  })
});
//# sourceMappingURL=auth.schema.js.map