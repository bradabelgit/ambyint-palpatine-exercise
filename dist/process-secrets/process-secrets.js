"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processSecrets = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _stream = _interopRequireDefault(require("stream"));

var _util = _interopRequireDefault(require("util"));

var _batch = require("./streams/batch");

var _decrypt = require("./streams/decrypt");

var _getLocation = require("./streams/get-location");

var _readLine = require("./streams/read-line");

var _throttle = require("./streams/throttle");

var _writeResult = require("./streams/write-result");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pipeline = _util.default.promisify(_stream.default.pipeline);

const logStream = new _stream.default.Writable({
  objectMode: true,

  write(chunk, encoding, callback) {
    console.log(chunk);
    callback();
  }

});

const start = async () => {
  try {
    await pipeline(_fs.default.createReadStream("test.txt"), new _readLine.ReadLine(), new _batch.Batch(), new _throttle.Throttle(), new _decrypt.Decrypt(), new _getLocation.GetLocation(), new _writeResult.WriteResult());
    console.log("done");
  } catch (err) {
    console.log("Error while executing pipeline...", err);
  }
};

const processSecrets = {
  start
};
exports.processSecrets = processSecrets;