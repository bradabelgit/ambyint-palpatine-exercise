"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Decrypt extends _stream.Transform {
  constructor(options) {
    super({ ...options,
      objectMode: true
    });
  }

  async _transform(line, encoding, callback) {
    try {
      const response = await (0, _axios.default)({
        data: {
          data: line
        },
        headers: {
          "x-api-key": "SwdoK4yB9znutWNPKNyw9lnuKjPRrIH5AFchkbyd"
        },
        method: "post",
        responseType: "json",
        url: "https://ylj3ustbsk.execute-api.us-east-1.amazonaws.com/qa/decrypt"
      });
      return callback(null, response.data);
    } catch (err) {
      return callback(err);
    }
  }

}

const decrypt = new Decrypt();
exports.decrypt = decrypt;