import { v4 as uuid } from "uuid";
import { IIdGenerator } from "./IIdGenerator";

class UUIDGeneratorDefault implements IIdGenerator<string> {
  next(): string {
    return uuid();
  }
}

/**
 * This class is responsible for generating UUIDs.
 */
export const UUIDGenerator = new UUIDGeneratorDefault();
