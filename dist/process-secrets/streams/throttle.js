"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Throttle = void 0;

var _stream = require("stream");

const BATCHES_PER_PERIOD = 3;
const BACK_OFF_INTERVAL = 1200;

const throttle = interval => new Promise(resolve => setTimeout(resolve, interval));

class Throttle extends _stream.Transform {
  constructor() {
    super({
      objectMode: true
    });
    this.batches = 0;
  }

  async _transform(batch, encoding, callback) {
    this.push(batch);
    this.batches += 1;

    if (this.batches % BATCHES_PER_PERIOD === 0) {
      console.log(`Throttling for ${BACK_OFF_INTERVAL}...`);
      await throttle(BACK_OFF_INTERVAL);
    }

    callback();
  }

}

exports.Throttle = Throttle;