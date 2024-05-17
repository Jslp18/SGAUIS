"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeworkSchema = void 0;
var _zod = require("zod");
var isTodayOrLater = function isTodayOrLater(dateString) {
  var inputDate = new Date(dateString);
  var today = new Date();
  if (inputDate < today) {
    return false; // Fecha anterior al día actual
  } else {
    return true; // Fecha igual o posterior al día actual
  }
};
var homeworkSchema = exports.homeworkSchema = _zod.z.object({
  nombre: _zod.z.string({
    required_error: 'El nombre del curso es necesario para el registro.'
  }).min(1, {
    message: 'El nombre debe contener mínimo 1 caracter.'
  }).max(50, {
    message: 'El nombre debe contener máximo 50 caracteres.'
  }),
  calificacionMaxima: _zod.z.number({
    required_error: 'La calificación máxima es requerida.',
    invalid_type_error: 'La calificación máxima debe ser un número de precisión doble.'
  }).min(0, {
    message: 'La calificación máxima es de mínimo 0'
  }).max(5.0, {
    message: 'La calificación máxima es de máximo 5.0'
  }),
  descripcion: _zod.z.string({
    required_error: 'La descripción es requerida.'
  }).min(20, {
    message: 'La descripción debe contener al menos 20 caracteres'
  }).max(200, {
    message: 'La descripción tiene una longitud máxima de 200 caracteres.'
  }),
  fecha: _zod.z.string({
    required_error: 'La fecha es requerida'
  }).refine(function (value) {
    return isTodayOrLater(value);
  }, {
    message: 'La fecha y hora no pueden ser anterior a la actual.'
  })
});
//# sourceMappingURL=homework.schema.js.map