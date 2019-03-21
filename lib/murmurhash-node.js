"use strict";

const murmurhash32v2 = require("./murmurhash32v2");
const murmurhash32v3 = require("./murmurhash32v3");

module.exports = {
  bit32: {
    v2: murmurhash32v2,
    v3: murmurhash32v3
  }
};
