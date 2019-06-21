import isEmpty from "lodash/isEmpty";
import {Transform} from "stream";

const BATCH_SIZE = 10;

export class Batch extends Transform {
  constructor() {
    super({objectMode: true});

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
    if (!isEmpty(this.batch)) {
      console.log(`Batched count = ${this.batch.length}`);

      this.push(this.batch);
    }

    callback();
  }
}
