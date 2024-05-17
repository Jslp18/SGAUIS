"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var homeworkSubmissionSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    require: true
  },
  calificacion: {
    type: number
  },
  pdfEntregaURL: {
    type: String,
    require: true
  },
  usuarioEntrega: {
    ref: 'Users',
    require: true,
    type: _mongoose.Schema.Types.ObjectId
  },
  estadoEntrega: {
    type: boolean,
    "default": false
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
var _default = exports["default"] = (0, _mongoose.model)('HomeworkSubmission', homeworkSubmissionSchema);
//# sourceMappingURL=homeworkSubmission.model.js.map