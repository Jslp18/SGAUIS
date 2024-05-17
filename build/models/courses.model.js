"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var coursesSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    unique: true
  },
  descripcion: {
    type: String,
    require: true
  },
  imagenURL: {
    type: String,
    require: true
  },
  creadoPor: {
    ref: 'Users',
    type: _mongoose.Schema.Types.ObjectId
  },
  foros: {
    ref: 'Foros',
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)('Courses', coursesSchema);
//# sourceMappingURL=courses.model.js.map