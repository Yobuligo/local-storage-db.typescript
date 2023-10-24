import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";

interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

const db = new Database("retrospective");
const Person = db.define<IPerson>("persons").build({ timestamps: false });
let persons = Person.select();
let person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
persons = Person.select({
  where: {
    lastname: "Starfish",
  },
});
debugger;
