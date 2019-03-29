const murmurhash64Av2 = require("../lib/murmurhash64Av2");

test("diffent length", () => {
  expect(murmurhash64Av2("1")).toBe("0xa5d08d6299c4888");
  expect(murmurhash64Av2("12")).toBe("0xed1ee14aa9f597b0");
  expect(murmurhash64Av2("123")).toBe("0xb26b00896960cb14");
  expect(murmurhash64Av2("1234")).toBe("0x92b7977746710c51");
  expect(murmurhash64Av2("12345")).toBe("0x2c468f7605bfecb");
  expect(murmurhash64Av2("123456")).toBe("0x99cda13344b54b1f");
  expect(murmurhash64Av2("1234567")).toBe("0xae9ebd2095279402");
  expect(murmurhash64Av2("12345678")).toBe("0x758f67d162b2d202");
  expect(murmurhash64Av2("123456789012345")).toBe("0xc3d5fb161c4025e1");
});

test("special chars", () => {
  expect(murmurhash64Av2(1234567)).toBe("0xae9ebd2095279402");
  expect(murmurhash64Av2(" ")).toBe("0xf2ca06addee21e60");
  expect(murmurhash64Av2("\t")).toBe("0xf28c94a40d616261");
  expect(murmurhash64Av2("~!@#$%^&*()_+{}|:?><-=`;',./\\\"")).toBe(
    "0x81eeaf2ebfb8df43"
  );
});

test("utf8 chars", () => {
  expect(murmurhash64Av2("这是一个测试")).toBe("0xd2c5dc15a2edd6fd");
  expect(murmurhash64Av2(Buffer.from("这是一个测试"))).toBe(
    "0xd2c5dc15a2edd6fd"
  );
  expect(murmurhash64Av2("this is a tést")).toBe("0xa078081253f11a86");
});

test("diffent seed", () => {
  expect(murmurhash64Av2("123456789012345", 1)).toBe("0x1b720bef8afa0a29");
  expect(murmurhash64Av2("123456789012345", "0xffffffffffffffff")).toBe(
    "0xb39c72eb1735ce85"
  );
});
