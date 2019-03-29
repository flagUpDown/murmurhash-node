const murmurhash32v3 = require("../lib/murmurhash32v3");

test("diffent length", () => {
  expect(murmurhash32v3("1")).toBe(2484513939);
  expect(murmurhash32v3("12")).toBe(4191350549);
  expect(murmurhash32v3("123")).toBe(2662625771);
  expect(murmurhash32v3("1234")).toBe(1914461635);
  expect(murmurhash32v3("1234567")).toBe(3085927159);
  expect(murmurhash32v3("12345678")).toBe(2444432334);
});

test("special chars", () => {
  expect(murmurhash32v3(1234567)).toBe(3085927159);
  expect(murmurhash32v3(" ")).toBe(2129959832);
  expect(murmurhash32v3("\t")).toBe(3919258131);
  expect(murmurhash32v3("~!@#$%^&*()_+{}|:?><-=`;',./\\\"")).toBe(1629848800);
});

test("utf8 chars", () => {
  expect(murmurhash32v3("这是一个测试")).toBe(3655299656);
  expect(murmurhash32v3(Buffer.from("这是一个测试"))).toBe(3655299656);
  expect(murmurhash32v3("this is a tést")).toBe(4113172854);
});

test("diffent seed", () => {
  expect(murmurhash32v3("1234567", 1)).toBe(496930645);
  expect(murmurhash32v3("1234567", 0xffffffff)).toBe(2196830230);
});
