"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSchema = void 0;
var validateSchema = exports.validateSchema = function validateSchema(schema) {
  return function (req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json(error.errors.map(function (error) {
        return error.message;
      }));
    }
  };
};
//# sourceMappingURL=validator.middleware.js.map