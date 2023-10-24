import { expect } from "chai";
import { Database } from "../../database/Database";
import { IDatabase } from "../../database/IDatabase";
import { ITable } from "../../table/ITable";
import { IPerson } from "../model/IPerson";

describe("Table", () => {
  let db: IDatabase;
  let Person: ITable<IPerson>;

  beforeEach(() => {
    db = new Database("demo");
    Person = db.define<IPerson>("persons").build();
  });

  describe("insert", () => {
    it("returns created object", () => {
      const person = Person.insert({ firstname: "123", lastname: "abc" });
      expect(person).not.equals(undefined);
    });

    it("returns created object and sets id", () => {
      const person = Person.insert({ firstname: "123", lastname: "abc" });
      expect(person.id).equals(1);
    });
  });

  describe("select", () => {
    it("returns all entries", () => {
      Person.insert({ firstname: "123", lastname: "abc" });
      Person.insert({ firstname: "123", lastname: "abc" });
      Person.insert({ firstname: "123", lastname: "abc" });
      const persons = Person.select();
      expect(persons.length).equals(3);
    });

    it("returns by where restricted entries", () => {
      Person.insert({ firstname: "123", lastname: "abc" });
      Person.insert({ firstname: "123", lastname: "abc" });
      Person.insert({ firstname: "123", lastname: "abc" });
      const persons = Person.select({ where: { id: 1 } });
      expect(persons.length).equals(1);
    });
  });
});
