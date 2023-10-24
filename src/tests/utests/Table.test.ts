import { expect } from "chai";
import { Database } from "../../database/Database";
import { IDatabase } from "../../database/IDatabase";
import { ITable } from "../../table/ITable";
import { IPerson } from "../model/IPerson";

describe("Table", () => {
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

    it("deletes nothing if not found", () => {
      insertPersons();
      Person.delete({ id: 10 });
      expect(Person.count()).equals(3);
    });
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

    it("returns by where multiple restricted entries", () => {
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
