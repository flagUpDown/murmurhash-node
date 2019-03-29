const murmurhash32v2 = require("../lib/murmurhash32v2");

test("diffent length", () => {
  expect(murmurhash32v2("1")).toBe(1228156847);
  expect(murmurhash32v2("12")).toBe(3282964525);
  expect(murmurhash32v2("123")).toBe(2461496879);
  expect(murmurhash32v2("1234")).toBe(25465593);
  expect(murmurhash32v2("1234567")).toBe(2438402682);
  expect(murmurhash32v2("12345678")).toBe(3528850415);
});

test("special chars", () => {
  expect(murmurhash32v2(1234567)).toBe(2438402682);
  expect(murmurhash32v2(" ")).toBe(1800440689);
  expect(murmurhash32v2("\t")).toBe(1758553497);
  expect(murmurhash32v2("~!@#$%^&*()_+{}|:?><-=`;',./\\\"")).toBe(3062773035);
});

test("utf8 chars", () => {
  expect(murmurhash32v2("这是一个测试")).toBe(1076180732);
  expect(murmurhash32v2(Buffer.from("这是一个测试"))).toBe(1076180732);
  expect(murmurhash32v2("this is a tést")).toBe(346350001);
});

test("diffent seed", () => {
  expect(murmurhash32v2("1234567", 1)).toBe(2741603086);
  expect(murmurhash32v2("1234567", 0xffffffff)).toBe(4032043662);
});
