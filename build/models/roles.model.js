"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var rolesSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
    unique: true
  }
}, {
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)('Rol', rolesSchema, 'rol');
//# sourceMappingURL=roles.model.js.map