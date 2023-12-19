import { expect } from "chai";
import { IHaveStorage } from "../../storage/IHaveStorage";
import { isHaveStorage } from "../../storage/isHaveStorage";

describe("isHaveStorage", () => {
  it("returns true if instance is IHaveStorage", () => {
    const instance: IHaveStorage<string> = {
      storage: {
        append: () => {},
        delete: () => {},
        read: () => {
          return [];
        },
        write: () => {},
      },
    };

    expect(isHaveStorage(instance)).equals(true);
  });

  it("returns false if instance is IHaveStorage", () => {
    const instance = {};
    expect(isHaveStorage(instance)).equals(false);
  });
});
