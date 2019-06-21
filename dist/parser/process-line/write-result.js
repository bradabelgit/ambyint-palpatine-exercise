"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeResult = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _reduce = _interopRequireDefault(require("lodash/reduce"));

var _stream = require("stream");

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const writeFile = _util.default.promisify(_fs.default.writeFile);

const mapToString = groups => {
  return (0, _reduce.default)(groups, (list, items, group) => {
    return list.concat([group, "", ...items].join("\n"));
  }, "");
};

class WriteResult extends _stream.Writable {
  constructor(options) {
    super({ ...options,
      objectMode: true
    });
    this.grouped = {};
  }

  async _final(callback) {
    await writeFile("result.txt", mapToString(this.grouped));
    callback();
  }

  _write(individual, encoding, callback) {
    this.grouped = { ...this.grouped,
      [individual.homeworld]: [...(this.grouped[individual.homeworld] || []), individual.name]
    };
    callback();
  }

}

const writeResult = new WriteResult();
exports.writeResult = writeResult;