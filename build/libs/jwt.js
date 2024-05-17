"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAccessToken = createAccessToken;
var _config = require("../config.js");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function createAccessToken(payload) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].sign({
      id: payload
    }, _config.appConfig.secret, {
      expiresIn: 10800
    },
    // Token que expira en un día. La palabra secret se encuentra en el archivo .env como variable de entorno,
    function (error, token) {
      if (error) reject(error);
      resolve(token);
    });
  });
}
//# sourceMappingURL=jwt.js.map