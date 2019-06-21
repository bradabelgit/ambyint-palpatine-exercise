"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.read = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const read = _fs.default.createReadStream("super-secret-data.txt");

exports.read = read;