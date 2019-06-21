"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readLine = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadLine extends _stream.Transform {
  constructor(options) {
    super({ ...options,
      objectMode: true
    });
  }

  _transform(chunk, encoding, callback) {
    const decoded = chunk.toString("utf8");
    const lines = decoded.split("\n");

    for (let line of lines) {
      if (!(0, _isEmpty.default)(line)) this.push(line);
    }

    callback();
  }

}

const readLine = new ReadLine();
exports.readLine = readLine;