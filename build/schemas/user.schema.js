"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = void 0;
var _zod = require("zod");
var registerSchema = exports.registerSchema = _zod.z.object({
  codigo: _zod.z.string({
    required_error: 'El código es requerido.'
  }).length(7, {
    message: 'La longitud del código es de 7 caracteres.'
  }).refine(function (codigo) {
    return !isNaN(Number(codigo));
  }, {
    message: 'El código debe ser númerico.'
  }),
  nombre: _zod.z.string({
    required_error: 'El nombre de usuario es necesario para el registro.'
  }).min(1, {
    message: 'El nombre debe contener mínimo 1 caracter.'
  }).max(50, {
    message: 'El nombre debe contener máximo 50 caracteres.'
  }),
  correo: _zod.z.string({
    required_error: 'El correo electrónico es requerido.'
  }).email({
    message: 'Correo electrónico inválido.'
  }),
  password: _zod.z.string({
    required_error: 'La contraseña es requerida.'
  }).min(14, {
    message: 'La contraseña debe contener mínimo 14 caracteres.'
  }).max(32, {
    message: 'La contraseña debe contener máximo 32 caracteres.'
  }),
  rol: _zod.z["enum"](['Estudiante', 'Profesor'])
});
//# sourceMappingURL=user.schema.js.map