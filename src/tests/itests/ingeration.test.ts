import { expect } from "chai";
import { Database } from "../../database/Database";
import { IDatabase } from "../../database/IDatabase";
import { ITable } from "../../table/ITable";
import { IPerson } from "../model/IPerson";

describe("Integration", () => {
  let db: IDatabase;
  let Person: ITable<IPerson>;

  beforeEach(() => {
    db = new Database("demo");
    Person = db.define<IPerson>("persons").build();
  });

  it("select returns an empty list if no data were inserted", () => {
    const persons = Person.select();
    expect(persons.length).equals(0);
  });

  it("select considers where condition", () => {
    Person.insert({ firstname: "Stacey", lastname: "Starfish" });
    Person.insert({ firstname: "Stacey", lastname: "Starfish" });
    Person.insert({ firstname: "Stacey", lastname: "Starfish" });
  });

  describe("define", () => {
    it("considers creating uuids", () => {
      Person = db.define<IPerson>("persons").build({ uuid: true });
      const person = Person.insert({
        firstname: "Stacey",
        lastname: "Starfish",
      });
      expect(typeof person.id).equals("string");
    });

    it("considers creating auto incremented ids", () => {
      Person = db.define<IPerson>("persons").build({ uuid: false });
      let person = Person.insert({
        firstname: "Stacey",
        lastname: "Starfish",
      });
      expect(typeof person.id).equals("number");
      person = Person.insert({
        firstname: "Stacey",
        lastname: "Starfish",
      });
      expect(typeof person.id).equals("number");
    });

    it("considers creating auto incremented ids as default", () => {
      Person = db.define<IPerson>("persons").build();
      let person = Person.insert({
        firstname: "Stacey",
        lastname: "Starfish",
      });
      expect(typeof person.id).equals("number");
    });
  });
});
