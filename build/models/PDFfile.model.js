"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _config = require("../config");
var pdfSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    require: true
  },
  pdfURL: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
  versionKey: false
});
pdfSchema.methods.setPdfURL = function setPdfURL(filename) {
  var host = _config.appConfig.host,
    port = _config.appConfig.port;
  this.pdfURL = "".concat(host, ":").concat(port, "/public/").concat(filename);
};
var _default = exports["default"] = (0, _mongoose.model)('PdfFile', pdfSchema);
//# sourceMappingURL=PDFfile.model.js.map