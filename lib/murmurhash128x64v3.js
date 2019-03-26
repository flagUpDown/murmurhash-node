"use strict";

/* global BigInt */

const { stringToBuffer, toUInt64, rotl64, fmix64 } = require("./utils");

const MURMURHASH_C1 = BigInt("0x87c37b91114253d5");
const MURMURHASH_C2 = BigInt("0x4cf5ad432745937f");

function murmurhash128x64v3(key, seed = 0) {
  key = stringToBuffer(key);
  seed = BigInt(seed);

  let len = key.length;
  let remainder = len & 15;
  let bytes = len - remainder;

  len = BigInt(len);
  let h1 = seed;
  let h2 = seed;

  let i = 0;
  while (i < bytes) {
    let k1 =
      BigInt(key[i++]) |
      (BigInt(key[i++]) << BigInt(8)) |
      (BigInt(key[i++]) << BigInt(16)) |
      (BigInt(key[i++]) << BigInt(24)) |
      (BigInt(key[i++]) << BigInt(32)) |
      (BigInt(key[i++]) << BigInt(40)) |
      (BigInt(key[i++]) << BigInt(48)) |
      (BigInt(key[i++]) << BigInt(56));

    let k2 =
      BigInt(key[i++]) |
      (BigInt(key[i++]) << BigInt(8)) |
      (BigInt(key[i++]) << BigInt(16)) |
      (BigInt(key[i++]) << BigInt(24)) |
      (BigInt(key[i++]) << BigInt(32)) |
      (BigInt(key[i++]) << BigInt(40)) |
      (BigInt(key[i++]) << BigInt(48)) |
      (BigInt(key[i++]) << BigInt(56));

    k1 *= MURMURHASH_C1;
    k1 = rotl64(k1, BigInt(31));
    k1 *= MURMURHASH_C2;
    h1 ^= k1;

    h1 = rotl64(h1, BigInt(27));
    h1 += h2;
    h1 = h1 * BigInt(5) + BigInt("0x52dce729");

    k2 *= MURMURHASH_C2;
    k2 = rotl64(k2, BigInt(33));
    k2 *= MURMURHASH_C1;
    h2 ^= k2;

    h2 = rotl64(h2, BigInt(31));
    h2 += h1;
    h2 = h2 * BigInt(5) + BigInt("0x38495ab5");
  }

  let k1 = BigInt(0);
  let k2 = BigInt(0);

  switch (remainder) {
    case 15:
      k2 ^= BigInt(key[i + 14]) << BigInt(48);
    case 14:
      k2 ^= BigInt(key[i + 13]) << BigInt(40);
    case 13:
      k2 ^= BigInt(key[i + 12]) << BigInt(32);
    case 12:
      k2 ^= BigInt(key[i + 11]) << BigInt(24);
    case 11:
      k2 ^= BigInt(key[i + 10]) << BigInt(16);
    case 10:
      k2 ^= BigInt(key[i + 9]) << BigInt(8);
    case 9:
      k2 ^= BigInt(key[i + 8]) << BigInt(0);
      k2 *= MURMURHASH_C2;
      k2 = rotl64(k2, BigInt(33));
      k2 *= MURMURHASH_C1;
      h2 ^= k2;

    case 8:
      k1 ^= BigInt(key[i + 7]) << BigInt(56);
    case 7:
      k1 ^= BigInt(key[i + 6]) << BigInt(48);
    case 6:
      k1 ^= BigInt(key[i + 5]) << BigInt(40);
    case 5:
      k1 ^= BigInt(key[i + 4]) << BigInt(32);
    case 4:
      k1 ^= BigInt(key[i + 3]) << BigInt(24);
    case 3:
      k1 ^= BigInt(key[i + 2]) << BigInt(16);
    case 2:
      k1 ^= BigInt(key[i + 1]) << BigInt(8);
    case 1:
      k1 ^= BigInt(key[i + 0]) << BigInt(0);
      k1 *= MURMURHASH_C1;
      k1 = rotl64(k1, BigInt(31));
      k1 *= MURMURHASH_C2;
      h1 ^= k1;
  }

  h1 ^= len;
  h2 ^= len;

  h1 += h2;
  h2 += h1;

  h1 = fmix64(h1);
  h2 = fmix64(h2);

  h1 += h2;
  h2 += h1;

  h1 = toUInt64(h1);
  h2 = toUInt64(h2);

  return "0x" + h1.toString(16) + h2.toString(16);
}

module.exports = murmurhash128x64v3;
