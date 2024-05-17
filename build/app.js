"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _courses = _interopRequireDefault(require("./routes/courses.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _professor = _interopRequireDefault(require("./routes/professor.routes"));
var _initialSetup = require("./libs/initialSetup");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
(0, _initialSetup.createUsers)();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use('/public', _express["default"]["static"]("".concat(__dirname, "/libs/pdf")));
app.set('pkg', _package["default"]);
app.get('/', function (req, res) {
  res.json({
    author: app.get('pkg').author,
    integrantes: app.get('pkg').integrants,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});
app.use('/profesor/cursos', _professor["default"]);
app.use('/escuela/cursos', _courses["default"]);
app.use('/', _auth["default"]);
app.use('/usuarios', _user["default"]);
var _default = exports["default"] = app;
//# sourceMappingURL=app.js.map