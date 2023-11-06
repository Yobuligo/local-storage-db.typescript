import { expect } from "chai";
import { like } from "../../where/like";

describe("like", () => {
  const text = "hello";

  it("returns true for starting *", () => {
    expect(like("*lo")(text)).equals(true);
  });

  it("returns true for ending *", () => {
    expect(like("hel*")(text)).equals(true);
  });

  it("returns true for * in middle", () => {
    expect(like("he*o")(text)).equals(true);
  });

  it("returns true for multiple * in middle", () => {
    expect(like("he*l*lo")(text)).equals(true);
  });

  it("returns true without *", () => {
    expect(like("hello")(text)).equals(true);
  });

  it("returns false for starting *", () => {
    expect(like("*a")(text)).equals(false);
  });

  it("returns false for ending *", () => {
    expect(like("pel*")(text)).equals(false);
  });

  it("returns false for * in middle", () => {
    expect(like("pe*o")(text)).equals(false);
  });

  it("returns false for multiple * in middle", () => {
    expect(like("he*p*lo")(text)).equals(false);
  });

  it("returns false without *", () => {
    expect(like("hello2")(text)).equals(false);
  });

  it("is case sensitive", () => {
    expect(like("Hello")(text)).equals(false);
  });
});
