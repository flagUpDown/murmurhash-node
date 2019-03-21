"use strict";

const { imul32, rotl32, fmix32, stringToBuffer } = require("./utils");

const MURMURHASH_C1 = 0xcc9e2d51;
const MURMURHASH_C2 = 0x1b873593;

function murmurHash32v3(key, seed = 0) {
  key = stringToBuffer(key);

  let len = key.length;
  let remainder = len & 3;
  let bytes = len - remainder;

  let h1 = seed;

  let i = 0;
  while (i < bytes) {
    let k1 = key[i++] | (key[i++] << 8) | (key[i++] << 16) | (key[i++] << 24);

    k1 = imul32(k1, MURMURHASH_C1);
    k1 = ((k1 & 0x1ffff) << 15) | (k1 >>> 17);
    k1 = imul32(k1, MURMURHASH_C2);

    h1 ^= k1;
    h1 = ((h1 & 0x7ffff) << 13) | (h1 >>> 19);
    h1 = (imul32(h1, 5) >>> 0) + 0xe6546b64;
  }

  let k1 = 0;
  switch (remainder) {
    case 3:
      k1 ^= key[i + 2] << 16;
    case 2:
      k1 ^= key[i + 1] << 8;
    case 1:
      k1 ^= key[i];

      k1 = imul32(k1, MURMURHASH_C1);
      k1 = rotl32(k1, 15);
      k1 = imul32(k1, MURMURHASH_C2);
      h1 ^= k1;
  }

  h1 ^= len;

  return fmix32(h1) >>> 0;
}

module.exports = murmurHash32v3;
