"use strict";

/* global BigInt */

const { stringToBuffer, toUInt64 } = require("./utils");

const MURMURHASH_M = BigInt("0xc6a4a7935bd1e995");
const MURMURHASH_R = BigInt(47);

function murmurhash64Av2(key, seed = 0) {
  key = stringToBuffer(key);

  let len = BigInt(key.length);
  seed = BigInt(seed);

  let h = seed ^ (len * MURMURHASH_M);
  let remainder = len & BigInt(7);
  let bytes = len - remainder;

  bytes = parseInt(bytes);
  let i = 0;
  while (i < bytes) {
    let k =
      BigInt(key[i++]) |
      (BigInt(key[i++]) << BigInt(8)) |
      (BigInt(key[i++]) << BigInt(16)) |
      (BigInt(key[i++]) << BigInt(24)) |
      (BigInt(key[i++]) << BigInt(32)) |
      (BigInt(key[i++]) << BigInt(40)) |
      (BigInt(key[i++]) << BigInt(48)) |
      (BigInt(key[i++]) << BigInt(56));

    k = k * MURMURHASH_M;
    k = toUInt64(k);
    k ^= k >> MURMURHASH_R;
    k *= MURMURHASH_M;

    h ^= k;
    h *= MURMURHASH_M;
  }

  switch (remainder) {
    case BigInt(7):
      h ^= BigInt(key[i + 6]) << BigInt(48);
    case BigInt(6):
      h ^= BigInt(key[i + 5]) << BigInt(40);
    case BigInt(5):
      h ^= BigInt(key[i + 4]) << BigInt(32);
    case BigInt(4):
      h ^= BigInt(key[i + 3]) << BigInt(24);
    case BigInt(3):
      h ^= BigInt(key[i + 2]) << BigInt(16);
    case BigInt(2):
      h ^= BigInt(key[i + 1]) << BigInt(8);
    case BigInt(1):
      h ^= BigInt(key[i]);

      h *= MURMURHASH_M;
  }

  h = toUInt64(h);
  h ^= h >> MURMURHASH_R;
  h *= MURMURHASH_M;
  h = toUInt64(h);
  h ^= h >> MURMURHASH_R;

  return h.toString(16);
}

module.exports = murmurhash64Av2;
