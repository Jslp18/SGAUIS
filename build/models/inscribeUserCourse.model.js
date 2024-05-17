"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var inscribeUserCourseSchema = new _mongoose.Schema({
  usuarios: {
    ref: 'Users',
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
var _default = exports["default"] = (0, _mongoose.model)('inscribeUsersCourse', inscribeUserCourseSchema);
//# sourceMappingURL=inscribeUserCourse.model.js.map