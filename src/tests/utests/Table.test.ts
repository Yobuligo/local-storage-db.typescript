import { expect } from "chai";
import { Database } from "../../database/Database";
import { IDatabase } from "../../database/IDatabase";
import { MemoryStorage } from "../../storage/MemoryStorage";
import { StorageFactory } from "../../storage/StorageFactory";
import { ITable } from "../../table/ITable";
import { ITableMeta } from "../../table/ITableMeta";
import { gt } from "../../where/gt";
import { IPerson } from "../model/IPerson";

describe("Table", () => {
  StorageFactory.storageType = MemoryStorage;
  let db: IDatabase;
  let Person: ITable<IPerson>;

  const firstname = "123";
  const lastname = "abc";

  const insertPersons = () => {
    Person.insert({ firstname, lastname });
    Person.insert({ firstname, lastname });
    Person.insert({ firstname, lastname });
  };

  beforeEach(() => {
    db = new Database("demo");
    Person = db.define<IPerson>("persons").build();
  });

  describe("count", () => {
    it("returns 0 if table is empty", () => {
      expect(Person.count()).equals(0);
    });

    it("returns number of entries", () => {
      insertPersons();
      expect(Person.count()).equals(3);
    });
  });

  describe("delete", () => {
    it("deletes all", () => {
      insertPersons();
      Person.delete();
      expect(Person.count()).equals(0);
    });

    it("deletes all restricted by where", () => {
      insertPersons();
      Person.delete({ id: 2 });
      const persons = Person.select();
      expect(persons.length).equals(2);
      expect(persons[0].id).equals(1);
      expect(persons[1].id).equals(3);
    });

    it("deletes all restricted by where with several conditions", () => {
      Person.insert({ firstname: "1", lastname: "1" });
      Person.insert({ firstname: "1", lastname: "2" });
      Person.insert({ firstname: "1", lastname: "3" });
      Person.delete({ firstname: "1", id: gt(1) });
      const persons = Person.select();
      expect(persons.length).equals(1);
      expect(persons[0].id).equals(1);
    });

    it("deletes nothing if not found", () => {
      insertPersons();
      Person.delete({ id: 10 });
      expect(Person.count()).equals(3);
    });
  });

  describe("drop", () => {
    it("deletes table data from storage", () => {
      insertPersons();
      Person.drop();
      expect(Person.count()).equals(0);
    });

    it("deletes table definition from metaTable", () => {
      insertPersons();
      Person.drop();
      const tableMetas: ITableMeta[] = db.metaTable.select();
      expect(tableMetas.length).equals(0);
    });
  });

  describe("insert", () => {
    it("adds object to table", () => {
      Person.insert({ firstname, lastname });
      const persons = Person.select();
      expect(persons.length).equals(1);
      expect(persons[0].firstname).equals(firstname);
      expect(persons[0].lastname).equals(lastname);
    });

    it("appends object to table and provides auto incremented id", () => {
      insertPersons();
      const person = Person.insert({ firstname: "1.1", lastname: "1.2" });
      const persons = Person.select();
      expect(persons.length).equals(4);
      expect(persons[3].firstname).equals("1.1");
      expect(persons[3].lastname).equals("1.2");
    });

    it("returns created object", () => {
      const person = Person.insert({ firstname: "123", lastname: "abc" });
      expect(person).not.equals(undefined);
    });

    it("returns created object and sets id", () => {
      const person = Person.insert({ firstname: "123", lastname: "abc" });
      expect(person.id).equals(1);
    });

    it("adds multiple objects to table", () => {
      Person.insert([
        { firstname: "1.1", lastname: "1.2" },
        { firstname: "2.1", lastname: "2.2" },
      ]);
      const persons = Person.select();
      expect(persons.length).equals(2);
      expect(persons[0].firstname).equals("1.1");
      expect(persons[0].lastname).equals("1.2");
      expect(persons[1].firstname).equals("2.1");
      expect(persons[1].lastname).equals("2.2");
    });

    it("appends multiple objects to table", () => {
      insertPersons();
      Person.insert([
        { firstname: "1.1", lastname: "1.2" },
        { firstname: "2.1", lastname: "2.2" },
      ]);
      const persons = Person.select();
      expect(persons.length).equals(5);
      expect(persons[3].firstname).equals("1.1");
      expect(persons[3].lastname).equals("1.2");
      expect(persons[4].firstname).equals("2.1");
      expect(persons[4].lastname).equals("2.2");
    });

    it("returns created objects and sets id", () => {
      const persons = Person.insert([
        { firstname: "1.1", lastname: "1.2" },
        { firstname: "2.1", lastname: "2.2" },
      ]);
      expect(persons.length).equals(2);
      expect(persons[0].firstname).equals("1.1");
      expect(persons[0].lastname).equals("1.2");
      expect(persons[1].firstname).equals("2.1");
      expect(persons[1].lastname).equals("2.2");
    });
  });

  describe("isDropped", () => {
    it("returns false if table is not dropped", () => {
      expect(Person.isDropped).equals(false);
    });

    it("returns true if table is dropped", () => {
      Person.drop();
      expect(Person.isDropped).equals(true);
    });
  });

  describe("select", () => {
    it("returns empty list if table is empty", () => {
      const persons = Person.select();
      expect(persons.length).equals(0);
    });

    it("returns all entries", () => {
      insertPersons();
      const persons = Person.select();
      expect(persons.length).equals(3);
    });

    it("returns by where restricted entries", () => {
      insertPersons();
      const persons = Person.select({ where: { id: 1 } });
      expect(persons.length).equals(1);
    });

    it("returns by where restricted entries with several conditions", () => {
      Person.insert({ firstname: "1", lastname: "1" });
      Person.insert({ firstname: "1", lastname: "2" });
      Person.insert({ firstname: "1", lastname: "3" });
      const persons = Person.select({
        where: { firstname: "1", lastname: "2" },
      });
      expect(persons.length).equals(1);
      expect(persons[0].firstname).equals("1");
      expect(persons[0].lastname).equals("2");
    });

    it("considers limit", () => {
      insertPersons();
      const persons = Person.select({ limit: 2 });
      expect(persons.length).equals(2);
    });

    it("considers limit in combination with where", () => {
      insertPersons();
      const persons = Person.select({ limit: 2, where: { id: 2 } });
      expect(persons.length).equals(1);
    });
  });

  describe("update", () => {
    it("updates all", () => {
      const expected = "changed";
      insertPersons();
      const updateResult = Person.update({ lastname: expected });
      expect(updateResult.numberChanges).equals(3);
      const persons = Person.select();
      expect(persons[0].lastname).equals(expected);
      expect(persons[1].lastname).equals(expected);
      expect(persons[2].lastname).equals(expected);
    });

    it("updates restricted by where", () => {
      const expected = "changed";
      insertPersons();
      const updateResult = Person.update({ lastname: expected }, { id: 2 });
      expect(updateResult.numberChanges).equals(1);
      const persons = Person.select();
      expect(persons[0].lastname).equals(lastname);
      expect(persons[1].lastname).equals(expected);
      expect(persons[2].lastname).equals(lastname);
    });

    it("updates nothing if not found", () => {
      const expected = "changed";
      insertPersons();
      const updateResult = Person.update({ lastname: expected }, { id: 10 });
      expect(updateResult.numberChanges).equals(0);
      const persons = Person.select();
      expect(persons[0].lastname).equals(lastname);
      expect(persons[1].lastname).equals(lastname);
      expect(persons[2].lastname).equals(lastname);
    });
  });
});
