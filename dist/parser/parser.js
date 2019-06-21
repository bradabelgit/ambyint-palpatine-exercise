"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parser = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _stream = _interopRequireDefault(require("stream"));

var _util = _interopRequireDefault(require("util"));

var _decrypt = require("./process-line/decrypt");

var _getLocation = require("./process-line/get-location");

var _readLine = require("./process-line/read-line");

var _writeResult = require("./process-line/write-result");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pipeline = _util.default.promisify(_stream.default.pipeline);

const parser = {
  parse: async () => {
    await pipeline(_fs.default.createReadStream("super-secret-data.txt"), _readLine.readLine, _decrypt.decrypt, _getLocation.getLocation, _writeResult.writeResult);
    console.log("done");
  }
};
exports.parser = parser;