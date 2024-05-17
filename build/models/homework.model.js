"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _zod = require("zod");
var homeworkSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    require: true
  },
  descripcion: {
    type: String,
    require: true
  },
  calificacionMaxima: {
    type: Number,
    require: true
  },
  fechaEntrega: {
    type: Date,
    require: true
  },
  pdfFile: {
    ref: 'PdfFile',
    require: true,
    type: _mongoose.Schema.Types.ObjectId
  },
  curso: {
    ref: 'Courses',
    require: true,
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)('Homework', homeworkSchema);
//# sourceMappingURL=homework.model.js.map