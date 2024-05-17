"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var professorController = _interopRequireWildcard(require("../controllers/professor.controller.js"));
var _importer = require("../middlewares/importer.js");
var _contentSchema = require("../schemas/content.schema.js");
var _homework = require("../schemas/homework.schema");
var _validate = require("../middlewares/validate.js");
var _validateJson = require("../middlewares/validateJson.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();
router.get('/', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isProfessor], professorController.getProfessorCourses);
router.get('/estudiantes/:courseId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isProfessor], professorController.getStudentsCourses);

// Contenido
router.post('/subirContenido/:courseId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isProfessor], _importer.storage.upload.single('pdf'), (0, _validate.validate)(_contentSchema.contentSchema), professorController.createContent);
router.get('/contenido/:courseId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isProfessor], professorController.getContentCourses);

// Tareas
router.post('/subirTarea/:courseId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isProfessor], _importer.storage.upload.single('pdf'), (0, _validateJson.validateJson)(_homework.homeworkSchema), professorController.createHomework);
router.get('/tareas/:courseId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isProfessor], professorController.getHomeworksCourse);
router.get('/tarea/:homeworkId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isProfessor], professorController.getHomeworkCourse);
router.post('/actualizarTarea/:homeworkId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isProfessor], _importer.storage.upload.single('pdf'), (0, _validateJson.validateJson)(_homework.homeworkSchema), professorController.editHomework);
router["delete"]('/tareas/:homeworkId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isProfessor], professorController.deleteHomework);
var _default = exports["default"] = router;
//# sourceMappingURL=professor.routes.js.map