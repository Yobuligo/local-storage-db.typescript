import { v4 as uuid } from "uuid";
import { IIdGenerator } from "./IIdGenerator";

/**
 * This class is responsible for generating UUIDs.
 */
export class UUIDGenerator implements IIdGenerator<string> {
  next(): string {
    return uuid();
  }
}
