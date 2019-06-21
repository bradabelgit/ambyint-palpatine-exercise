import fs from "fs";
import stream from "stream";
import util from "util";

const pipeline = util.promisify(stream.pipeline);

import {Batch} from "./streams/batch";
import {Decrypt} from "./streams/decrypt";
import {GetLocation} from "./streams/get-location";
import {ReadLine} from "./streams/read-line";
import {Throttle} from "./streams/throttle";
import {WriteResult} from "./streams/write-result";

const start = async () => {
  try {
    await pipeline(
      fs.createReadStream("test.txt"),
      new ReadLine(),
      new Batch(),
      new Throttle(),
      new Decrypt(),
      new GetLocation(),
      new WriteResult(),
    );

    console.log("done");
  } catch (err) {
    console.log("Error while executing pipeline...", err);
  }
};

export const processSecrets = {
  start,
};
