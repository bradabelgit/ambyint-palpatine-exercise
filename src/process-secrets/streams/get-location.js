import axios from "axios";
import get from "lodash/get";
import isNil from "lodash/isNil";
import {Transform} from "stream";

export class GetLocation extends Transform {
  constructor(options) {
    super({
      ...options,
      objectMode: true,
    });

    // This is a dumb cache which could result in a memory leak if too many locations exist.
    // It could either be improved to remove unused locations after the cache gets too large
    // or implement a better solution such as Redis
    this.cache = {};
  }

  async getHomeworld(individual) {
    const {homeworld} = individual;

    if (this.cache[homeworld]) {
      return this.cache[homeworld];
    }

    const response = await axios({
      method: "get",
      responseType: "json",
      url: homeworld,
    });

    this.cache[homeworld] = get(response, "data.name");

    return this.cache[homeworld];
  }

  async _transform(individual, encoding, callback) {
    if (isNil(get(individual, "homeworld"))) {
      return callback();
    }

    this.push({
      ...individual,
      homeworld: await this.getHomeworld(individual),
    });

    callback();
  }
}
