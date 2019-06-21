"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Batch = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BATCH_SIZE = 10;

class Batch extends _stream.Transform {
  constructor() {
    super({
      objectMode: true
    });
    this.batch = [];
  }

  async _transform(chunk, encoding, callback) {
    this.batch = [...this.batch, chunk];

    if (this.batch.length === BATCH_SIZE) {
      console.log(`Batched count = ${this.batch.length}`);
      this.push(this.batch);
      this.batch = [];
    }

    callback();
  }

  async _final(callback) {
    if (!(0, _isEmpty.default)(this.batch)) {
      console.log(`Batched count = ${this.batch.length}`);
      this.push(this.batch);
    }

    callback();
  }

}

exports.Batch = Batch;