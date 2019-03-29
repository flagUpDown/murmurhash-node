const murmurhash128x64v3 = require("../lib/murmurhash128x64v3");

test("diffent length", () => {
  expect(murmurhash128x64v3("123456789012345")).toBe(
    "0x887001aea2afcfd61ec326364f0801b3"
  );
  expect(murmurhash128x64v3("1234567890123456123456789012345")).toBe(
    "0xcaa182623d84d1a456d557af4999771e"
  );
});

test("special chars", () => {
  expect(murmurhash128x64v3(1234567)).toBe(
    "0x2cdac5f7f2c623a237dc518bcae1d955"
  );
  expect(murmurhash128x64v3(" ")).toBe("0x18f081109e84f7393fd44c9b7c437cb8");
  expect(murmurhash128x64v3("\t")).toBe("0x8012b31512088c65ef7ca289ea728b51");
  expect(murmurhash128x64v3("~!@#$%^&*()_+{}|:?><-=`;',./\\\"")).toBe(
    "0x48c4a8054950798bb13856796e9bd5cd"
  );
});

test("utf8 chars", () => {
  expect(murmurhash128x64v3("这是一个测试")).toBe(
    "0xa61f8b5ef488bd45bf2b5b2fed32895b"
  );
  expect(murmurhash128x64v3(Buffer.from("这是一个测试"))).toBe(
    "0xa61f8b5ef488bd45bf2b5b2fed32895b"
  );
  expect(murmurhash128x64v3("this is a tést")).toBe(
    "0xc002504437a363e61c13bc1910c9b238"
  );
});

test("diffent seed", () => {
  expect(murmurhash128x64v3("1234567890123456123456789012345", 1)).toBe(
    "0xe3689ba9d491ef361fd9b92b4b47933c"
  );
  expect(
    murmurhash128x64v3("1234567890123456123456789012345", "0xffffffff")
  ).toBe("0x5aeffaf8f3ff3471702cf6401585f44d");
});
