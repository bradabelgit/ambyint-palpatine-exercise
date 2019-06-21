"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Decrypt = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeRequest = async data => {
  const response = await (0, _axios.default)({
    data,
    headers: {
      "x-api-key": "NtSUUceMXd4NYxsyG1JP52SeB9F4ENQ778J30BqA"
    },
    method: "post",
    responseType: "json",
    url: "https://qksflq92ll.execute-api.us-east-1.amazonaws.com/dev/decrypt"
  });
  return response.data;
};

class Decrypt extends _stream.Transform {
  constructor() {
    super({
      objectMode: true,
      writableHighWaterMark: 3
    });
  }

  async _transform(lines, encoding, callback) {
    let data;

    try {
      data = await makeRequest(lines);
      console.log("Decrypted data", data);
    } catch (err) {
      return callback(err);
    }

    for (let d of data) {
      this.push(d);
    }

    callback();
  }

}

exports.Decrypt = Decrypt;