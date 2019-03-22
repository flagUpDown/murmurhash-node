"use strict";

const {
  int32to64,
  leftShift64,
  rightShift64,
  imul64,
  xor64,
  stringToBuffer
} = require("./utils");

const MURMURHASH_M = [0xc6a4a793, 0x5bd1e995];
const MURMURHASH_R = 47;

function murmurhash64Av2(key, seed = 0) {
  key = stringToBuffer(key);

  let len = key.length;

  let h = xor64(int32to64(seed), imul64(int32to64(len), MURMURHASH_M));
  let remainder = len & 7;
  let bytes = len - remainder;

  let i = 0;
  while (i < bytes) {
    let k = [
      key[i + 4] | (key[i + 5] << 8) | (key[i + 6] << 16) | (key[i + 7] << 24),
      key[i] | (key[i + 1] << 8) | (key[i + 2] << 16) | (key[i + 3] << 24)
    ];

    i += 8;

    k = imul64(k, MURMURHASH_M);
    k = xor64(k, rightShift64(k, MURMURHASH_R));
    k = imul64(k, MURMURHASH_M);

    h = xor64(h, k);
    h = imul64(h, MURMURHASH_M);
  }

  switch (remainder) {
    case 7:
      h = xor64(h, leftShift64(int32to64(key[i + 6]), 48));
    case 6:
      h = xor64(h, leftShift64(int32to64(key[i + 5]), 40));
    case 5:
      h = xor64(h, leftShift64(int32to64(key[i + 4]), 32));
    case 4:
      h = xor64(h, leftShift64(int32to64(key[i + 3]), 24));
    case 3:
      h = xor64(h, leftShift64(int32to64(key[i + 2]), 16));
    case 2:
      h = xor64(h, leftShift64(int32to64(key[i + 1]), 8));
    case 1:
      h = xor64(h, int32to64(key[i]));

      h = imul64(h, MURMURHASH_M);
  }

  h = xor64(h, rightShift64(h, MURMURHASH_R));
  h = imul64(h, MURMURHASH_M);
  h = xor64(h, rightShift64(h, MURMURHASH_R));

  let buf = Buffer.allocUnsafe(8);
  buf.writeUInt32BE(h[0] >>> 0, 0);
  buf.writeUInt32BE(h[1] >>> 0, 4);

  return buf.toString("hex");
}

module.exports = murmurhash64Av2;
