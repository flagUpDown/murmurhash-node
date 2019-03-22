"use strict";

const murmurhash32v2 = require("./murmurhash32v2");
const murmurhash32v3 = require("./murmurhash32v3");
const murmurhash64Av2 = require("./murmurhash64Av2");

module.exports = {
  bit32: {
    v2: murmurhash32v2,
    v3: murmurhash32v3
  },
  bit64: {
    Av2: murmurhash64Av2
  }
};
