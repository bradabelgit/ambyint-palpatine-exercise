"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.group = void 0;

var _stream = require("stream");

const group = new _stream.Transform({
  objectMode: true,

  transform(chunk, encoding, callback) {
    console.log(chunk);
    this.result = [...(this.result || []), chunk];
    return callback(null, chunk);
  }

});
exports.group = group;