"use strict";

const { imul32, stringToBuffer } = require("./utils");

const MURMURHASH_M = 0x5bd1e995;
const MURMURHASH_R = 24;

function murmurHash32v2(key, seed = 0) {
  key = stringToBuffer(key);

  let len = key.length;
  let h = seed ^ len;
  let i = 0;
  let k = 0;

  while (len >= 4) {
    k = key[i++] | (key[i++] << 8) | (key[i++] << 16) | (key[i++] << 24);

    k = imul32(k, MURMURHASH_M);
    k ^= k >>> MURMURHASH_R;
    k = imul32(k, MURMURHASH_M);

    h = imul32(h, MURMURHASH_M) ^ k;

    len -= 4;
  }

  switch (len) {
    case 3:
      h ^= key[i + 2] << 16;
    case 2:
      h ^= key[i + 1] << 8;
    case 1:
      h ^= key[i];
      h = imul32(h, MURMURHASH_M);
  }

  h ^= h >>> 13;
  h = imul32(h, MURMURHASH_M);
  h ^= h >>> 15;

  return h >>> 0;
}

module.exports = murmurHash32v2;
