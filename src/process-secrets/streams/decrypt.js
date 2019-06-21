import axios from "axios";
import {Transform} from "stream";

const makeRequest = async data => {
  const response = await axios({
    data,
    headers: {
      "x-api-key": "NtSUUceMXd4NYxsyG1JP52SeB9F4ENQ778J30BqA"
    },
    method: "post",
    responseType: "json",
    url: "https://qksflq92ll.execute-api.us-east-1.amazonaws.com/dev/decrypt",
  });

  return response.data;
};

export class Decrypt extends Transform {
  constructor() {
    super({
      objectMode: true,
      writableHighWaterMark: 3,
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
