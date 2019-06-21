import fs from "fs";
import reduce from "lodash/reduce";
import {Writable} from "stream";
import util from "util";

const writeFile = util.promisify(fs.writeFile);

const mapToString = groups => {
  return reduce(groups, (list, items, group, index) => {
    items = [...items].map( item => `- ${item}`);

    return list.concat([
      group,
      "",
      ...items,
      "",
      "",
    ].join("\n"));
  }, "");
};

export class WriteResult extends Writable {
  constructor(options) {
    super({
      ...options,
      objectMode: true,
    });

    this.grouped = {};
  }

  _write(individual, encoding, callback) {
    const {
      homeworld,
      name
    } = individual;

    this.grouped = {
      ...this.grouped,
      [homeworld]: new Set([
        ...(this.grouped[homeworld] || []),
        name,
      ]),
    };

    callback();
  }

  async _final(callback) {
    await writeFile("result.txt", mapToString(this.grouped));

    callback();
  }
}
