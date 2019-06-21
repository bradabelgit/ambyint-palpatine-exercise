"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteResult = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _reduce = _interopRequireDefault(require("lodash/reduce"));

var _stream = require("stream");

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const writeFile = _util.default.promisify(_fs.default.writeFile);

const mapToString = groups => {
  return (0, _reduce.default)(groups, (list, items, group, index) => {
    items = [...items].map(item => `- ${item}`);
    return list.concat([group, "", ...items, "", ""].join("\n"));
  }, "");
};

class WriteResult extends _stream.Writable {
  constructor(options) {
    super({ ...options,
      objectMode: true
    });
    this.grouped = {};
  }

  _write(individual, encoding, callback) {
    const {
      homeworld,
      name
    } = individual;
    this.grouped = { ...this.grouped,
      [homeworld]: new Set([...(this.grouped[homeworld] || []), name])
    };
    callback();
  }

  async _final(callback) {
    await writeFile("result.txt", mapToString(this.grouped));
    callback();
  }

}

exports.WriteResult = WriteResult;