import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";

interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

const db = new Database("retrospective");
const Person = db.define<IPerson>("persons");
let persons = Person.select();
const person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
persons = Person.select();
debugger