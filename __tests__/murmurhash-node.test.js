const murmurhash = require("../lib/murmurhash-node");

test("diffent hash", () => {
  expect(murmurhash.bit32.v2("1234567")).toBe(2438402682);
  expect(murmurhash.bit32.v3("1234567")).toBe(3085927159);
  expect(murmurhash.bit64.Av2("123456789012345")).toBe("0xc3d5fb161c4025e1");
  expect(murmurhash.bit128.x64v3("1234567890123456123456789012345")).toBe(
    "0xcaa182623d84d1a456d557af4999771e"
  );
});
