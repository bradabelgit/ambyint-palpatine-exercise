import isEmpty from "lodash/isEmpty";
import {Transform} from "stream";

export class ReadLine extends Transform {
  constructor() {
    super({objectMode: true});

    this.pending = "";
  }

  _transform(chunk, encoding, callback) {
    const decoded = chunk.toString("utf8");

    for (const c of decoded) {
      if (c === "\n" && !isEmpty(this.pending)) {
        this.push(this.pending);
        this.pending = "";
        continue;
      }

      this.pending += c;
    }

    callback();
  }
}
