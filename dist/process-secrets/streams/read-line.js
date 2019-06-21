"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadLine = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReadLine extends _stream.Transform {
  constructor() {
    super({
      objectMode: true
    });
    this.pending = "";
  }

  _transform(chunk, encoding, callback) {
    const decoded = chunk.toString("utf8");

    for (const c of decoded) {
      if (c === "\n" && !(0, _isEmpty.default)(this.pending)) {
        this.push(this.pending);
        this.pending = "";
        continue;
      }

      this.pending += c;
    }

    callback();
  }

}

exports.ReadLine = ReadLine;