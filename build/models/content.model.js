"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var contentSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    require: true
  },
  descripcion: {
    type: String,
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
var _default = exports["default"] = (0, _mongoose.model)('Content', contentSchema);
//# sourceMappingURL=content.model.js.map