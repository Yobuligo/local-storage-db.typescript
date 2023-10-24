import { Database } from "../../database/Database";
import { IDatabase } from "../../database/IDatabase";
import { ITable } from "../../table/ITable";
import { IPerson } from "../model/IPerson";

describe("Database", () => {
  let db: IDatabase;
  let Person: ITable<IPerson>;

  beforeEach(() => {
    db = new Database("demo");
    Person = db.define<IPerson>("persons").build();
  });
});
