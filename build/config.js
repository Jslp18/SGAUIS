"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var config = {
  appConfig: {
    port: process.env.APP_PORT,
    secret: process.env.SECRET,
    host: process.env.APP_HOST
  },
  dbConfig: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    clustername: process.env.DB_CLUSTERNAME,
    dbname: process.env.DB_DBNAME,
    projectname: process.env.DB_PROJECTNAME
  }
};
module.exports = config;
//# sourceMappingURL=config.js.map