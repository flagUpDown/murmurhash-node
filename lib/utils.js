"use strict";

/*
 * all ints are unsigned
 * an array of two 32bit ints as a 64bit int
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

function int32to64(num) {
  return [0, num & 0xffffffff];
}

function leftShift64(x, r) {
  r %= 64;

  if (r === 0) {
    return x;
  } else if (r < 32) {
    return [(x[0] << r) | (x[1] >>> (32 - r)), x[1] << r];
  } else {
    return [x[1] << (r - 32), 0];
  }
}

function rightShift64(x, r) {
  r %= 64;

  if (r === 0) {
    return x;
  } else if (r < 32) {
    return [x[0] >>> r, (x[1] >>> r) | (x[0] << (32 - r))];
  } else {
    return [0, x[0] >>> (r - 32)];
  }
}

function add64(a, b) {
  a = [a[0] >>> 16, a[0] & 0xffff, a[1] >>> 16, a[1] & 0xffff];
  b = [b[0] >>> 16, b[0] & 0xffff, b[1] >>> 16, b[1] & 0xffff];
  let c = [0, 0, 0, 0];

  c[3] += a[3] + b[3];
  c[2] += c[3] >>> 16;
  c[3] &= 0xffff;

  c[2] += a[2] + b[2];
  c[1] += c[2] >>> 16;
  c[2] &= 0xffff;

  c[1] += a[1] + b[1];
  c[0] += c[1] >>> 16;
  c[1] &= 0xffff;

  c[0] += a[0] + b[0];
  c[0] &= 0xffff;

  return [(c[0] << 16) | c[1], (c[2] << 16) | c[3]];
}

function imul64(a, b) {
  a = [a[0] >>> 16, a[0] & 0xffff, a[1] >>> 16, a[1] & 0xffff];
  b = [b[0] >>> 16, b[0] & 0xffff, b[1] >>> 16, b[1] & 0xffff];
  let c = [0, 0, 0, 0];

  c[3] += a[3] * b[3];
  c[2] += c[3] >>> 16;
  c[3] &= 0xffff;

  c[2] += a[2] * b[3];
  c[1] += c[2] >>> 16;
  c[2] &= 0xffff;

  c[2] += a[3] * b[2];
  c[1] += c[2] >>> 16;
  c[2] &= 0xffff;

  c[1] += a[1] * b[3];
  c[0] += c[1] >>> 16;
  c[1] &= 0xffff;

  c[1] += a[2] * b[2];
  c[0] += c[1] >>> 16;
  c[1] &= 0xffff;

  c[1] += a[3] * b[1];
  c[0] += c[1] >>> 16;
  c[1] &= 0xffff;

  c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0];
  c[0] &= 0xffff;

  return [(c[0] << 16) | c[1], (c[2] << 16) | c[3]];
}

function xor64(m, n) {
  return [m[0] ^ n[0], m[1] ^ n[1]];
}

module.exports = {
  imul32,
  rotl32,
  fmix32,
  stringToBuffer,
  int32to64,
  leftShift64,
  rightShift64,
  add64,
  imul64,
  xor64
};
