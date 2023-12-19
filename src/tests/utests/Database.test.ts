import { expect } from "chai";
import { Database } from "../../database/Database";
import { IDatabase } from "../../database/IDatabase";
import { MemoryStorage } from "../../storage/MemoryStorage";
import { StorageFactory } from "../../storage/StorageFactory";
import { ITable } from "../../table/ITable";
import { IPerson } from "../model/IPerson";
import { ITask } from "../model/ITask";

describe("Database", () => {
  StorageFactory.storageType = MemoryStorage;
  let db: IDatabase;
  let Person: ITable<IPerson>;

  beforeEach(() => {
    db = new Database("demo");
    Person = db.define<IPerson>("persons").build();
  });

  describe("metaTable", () => {
    it("is not null", () => {
      expect(db.metaTable).not.equal(null);
    });
  });

  describe("drop", () => {
    const Task = db.define<ITask>("tasks").build();
    Task.insert({
      description: "Hello World Description",
      title: "Hello World Title",
    });

    db.drop();
    expect(Person.count()).equals(0);
    expect(Task.count()).equals(0);
    expect(db.metaTable.count()).equals(0);
  });
});
