"use strict";

/* global BigInt */

/*
 * all ints are unsigned
 */

function imul32(a, b) {
  let aHi = (a >>> 16) & 0xffff;
  let aLo = a & 0xffff;
  let bHi = (b >>> 16) & 0xffff;
  let bLo = b & 0xffff;
  // the shift by 0 fixes the sign on the high part
  return aLo * bLo + (((aHi * bLo + aLo * bHi) << 16) >>> 0);
}

function rotl32(x, r) {
  r %= 32;
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

function stringToBuffer(str) {
  if (typeof str === "string") {
    str = Buffer.from(str);
  } else if (!Buffer.isBuffer(str)) {
    str = Buffer.from(String(str));
  }
  return str;
}

function toUInt64(num) {
  return num & BigInt("0xffffffffffffffff");
}

function rotl64(x, r) {
  r %= BigInt(64);
  x = toUInt64(x);
  return (x << r) | (x >> (BigInt(64) - r));
}

function fmix64(k) {
  k = toUInt64(k);
  k ^= k >> BigInt(33);
  k *= BigInt("0xff51afd7ed558ccd");
  k = toUInt64(k);
  k ^= k >> BigInt(33);
  k *= BigInt("0xc4ceb9fe1a85ec53");
  k = toUInt64(k);
  k ^= k >> BigInt(33);

  return k;
}

module.exports = {
  imul32,
  rotl32,
  fmix32,
  stringToBuffer,
  toUInt64,
  rotl64,
  fmix64
};
