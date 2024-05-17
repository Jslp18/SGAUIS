"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var coursesController = _interopRequireWildcard(require("../controllers/courses.controller"));
var _importer = require("../middlewares/importer.js");
var _validatorMiddleware = require("../middlewares/validator.middleware.js");
var _coursesSchema = require("../schemas/courses.schema.js");
var _inscribeUsersSchema = require("../schemas/inscribeUsers.schema.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();
router.get('/', _importer.verifyJwt.verifyToken, coursesController.getCourses);
router.get('/:nombres', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isSchool], coursesController.getCourseById);
router.post('/', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isSchool, (0, _validatorMiddleware.validateSchema)(_coursesSchema.coursesSchema), _importer.validateCoursename.checkDuplicateName], coursesController.createCourse);
router.put('/:courseId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isSchool, (0, _validatorMiddleware.validateSchema)(_coursesSchema.coursesSchema)], coursesController.updateCourseById);
router["delete"]('/:courseId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isSchool], coursesController.deleteCourseById);
router.post('/inscribirUsuarios/:courseId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isSchool, (0, _validatorMiddleware.validateSchema)(_inscribeUsersSchema.inscribeUsersSchema), _importer.validateCode.checkDuplicateCode], coursesController.inscribeUserCourses);
router.post('/desinscribirUsuarios/:courseId', [_importer.verifyJwt.verifyToken, _importer.verifyJwt.isSchool, (0, _validatorMiddleware.validateSchema)(_inscribeUsersSchema.inscribeUsersSchema), _importer.validateUndoCode.checkUndoDuplicateCode], coursesController.undoInscribeUserCourses);
var _default = exports["default"] = router;
//# sourceMappingURL=courses.routes.js.map