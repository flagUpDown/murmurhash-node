"use strict";

function imul32(a, b) {
  let aHi = (a >>> 16) & 0xffff;
  let aLo = a & 0xffff;
  let bHi = (b >>> 16) & 0xffff;
  let bLo = b & 0xffff;
  // the shift by 0 fixes the sign on the high part
  // the final |0 converts the unsigned value into a signed value
  return (aLo * bLo + (((aHi * bLo + aLo * bHi) << 16) >>> 0)) | 0;
}

function rotl32(x, r) {
  return ((x & ((1 << (32 - r)) - 1)) << r) | (x >>> (32 - r));
}

function fmix32(h) {
  h ^= h >>> 16;
  h = imul32(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = imul32(h, 0xc2b2ae35);
  h ^= h >>> 16;

  return h;
}

module.exports = {
  imul32,
  rotl32,
  fmix32
};
