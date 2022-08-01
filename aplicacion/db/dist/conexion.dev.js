"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = db;

var sql = require('mssql');

function db() {
  return regeneratorRuntime.async(function db$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(sql.connect("Server=192.168.88.253;Database=jhostter;User Id=prueba;Password=123;trustServerCertificate=true"));

        case 2:
          return _context.abrupt("return", sql);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}