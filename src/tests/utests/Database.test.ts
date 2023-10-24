import { Database } from "../../database/Database";
import { IDatabase } from "../../database/IDatabase";
import { MemoryStorage } from "../../storage/MemoryStorage";
import { StorageFactory } from "../../storage/StorageFactory";
import { ITable } from "../../table/ITable";
import { IPerson } from "../model/IPerson";

describe("Database", () => {
  StorageFactory.storageType = MemoryStorage
  let db: IDatabase;
  let Person: ITable<IPerson>;

  beforeEach(() => {
    db = new Database("demo");
    Person = db.define<IPerson>("persons").build();
  });
});
