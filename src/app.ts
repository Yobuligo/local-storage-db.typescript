import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";

interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

const db = new Database("retrospective");
const Person = db.define<IPerson>("persons").build();
Person.insert({ firstname: "123", lastname: "abc" });
Person.insert({ firstname: "123", lastname: "abc" });
Person.insert({ firstname: "123", lastname: "abc" });
const persons = Person.select({ where: { id: 1 } });

console.log(persons.length)


debugger;
