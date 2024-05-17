"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(__dirname, '../libs/pdf'));
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, "".concat(file.fieldname, "-").concat(uniqueSuffix, ".pdf"));
  }
});
var upload = exports.upload = (0, _multer["default"])({
  storage: storage
});
//# sourceMappingURL=storage.js.map