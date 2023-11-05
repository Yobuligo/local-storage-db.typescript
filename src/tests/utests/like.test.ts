import { like } from "../../where/like";

describe("like", () => {
  it("returns true if fits", () => {
    const predicate = like("Hello World");
    predicate("hello ");
  });
});
