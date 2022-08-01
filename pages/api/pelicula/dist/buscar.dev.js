"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;

var _conexion = _interopRequireDefault(require("../../../aplicacion/db/conexion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["select * from peliculas where titulo like '%'+", "+'%'"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function handler(request, response) {
  var _db, pelicula;

  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _conexion["default"])());

        case 2:
          _db = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(_db.query(_templateObject(), request.query.titulo_pelicula));

        case 5:
          pelicula = _context.sent;
          response.status(200).json(pelicula.recordset);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}