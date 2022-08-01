"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;

var _conexion = _interopRequireDefault(require("../../../aplicacion/db/conexion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["insert into actores_peliculas(pelicula_id, actor_id) values(", ", ", ")"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function handler(request, response) {
  var _db;

  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(request.method == "POST")) {
            _context.next = 9;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap((0, _conexion["default"])());

        case 3:
          _db = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_db.query(_templateObject(), request.body.pelicula_id, request.body.actor_id));

        case 6:
          response.status(200).json({});
          _context.next = 10;
          break;

        case 9:
          response.status(402).json({
            error: "HTTP METODO INVALIDO"
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}