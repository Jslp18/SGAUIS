"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coursesSchema = void 0;
var _zod = require("zod");
var coursesSchema = exports.coursesSchema = _zod.z.object({
  nombre: _zod.z.string({
    required_error: 'El nombre de curso es necesario para el registro.'
  }).min(1, {
    message: 'El nombre debe contener mínimo 1 caracter.'
  }).max(50, {
    message: 'El nombre debe contener máximo 50 caracteres.'
  }),
  descripcion: _zod.z.string({
    required_error: 'La descripción es requerida.'
  }).min(20, {
    message: 'La descripción debe contener al menos 20 caracteres'
  }).max(200, {
    message: 'La descripción tiene una longitud máxima de 200 caracteres.'
  }),
  imagenURL: _zod.z.string({
    required_error: 'La imagen del curso es requerida.'
  }).url({
    message: 'URL de imagen inválida.'
  })
});
//# sourceMappingURL=courses.schema.js.map