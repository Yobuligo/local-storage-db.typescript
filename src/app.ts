import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";

interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

const db = new Database("retrospective");
const Person = db.define<IPerson>("persons").build();
let persons = Person.select();
let person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
persons = Person.select({
  where: {
    lastname: "Starfish",
  },
});

Person.update({ firstname: "Peter" }, { id: 2 });
persons = Person.select();
Person.delete();
debugger;
