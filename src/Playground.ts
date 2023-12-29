import { IRecord } from "./record/IRecord";
import { MemoryStorage } from "./storage/MemoryStorage";
import { StorageFactory } from "./storage/StorageFactory";
import { ITable } from "./table/ITable";
import { Table } from "./table/Table";
import { TableConstructor } from "./table/TableConstructor";
import { IdType } from "./types/IdType";

interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

interface ITask extends IRecord<number> {
  title: string;
}

interface ICar extends IRecord<number> {
  brand: string;
}

StorageFactory.storageType = MemoryStorage;

class DTask extends Table<ITask> {
  readonly person = this.oneToOne(DPerson);
}

class DPerson extends Table<IPerson> {
  readonly tasks = this.oneToMany(DTask);
}

const define = <
  TRecord extends IRecord<IdType>,
  TTable extends ITable<TRecord>
>(
  name: string,
  type: TableConstructor<TRecord, TTable>
): TTable => {
  throw new Error();
};

const Person = define("persons", DPerson);
const Task = define("tasks", DTask);

// const Person = db.define(Person)

// const db: IDatabase = new Database("demo");
// // const Task = db.define<ITask>("tasks").build();
// const Car = db.define<ICar>("cars").build();
// // const Person = db.define<IPerson>("persons").build({});

// Task.select;

// const task = Task.insert({ title: "Test" });
// const person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
// const car = Car.insert({ brand: "BMW" });

// Person.insert({ firstname: "Rene", lastname: "Hoffmann" });
// Person.insert({ firstname: "Johann", lastname: "Vogel" });
// Person.insert({ firstname: "Peter", lastname: "Hoffmann" });
// Person.insert({ firstname: "Ilona", lastname: "Amsel" });
// Person.insert({ firstname: "Andreas", lastname: "Schöttler" });
// Person.insert({ firstname: "Ilona", lastname: "Zilpzalp" });
// Person.insert({ firstname: "Verena", lastname: "Tewes" });
// Person.insert({ firstname: "Steffen", lastname: "Hoffmann" });
// Person.insert({ firstname: "Mathias", lastname: "Groppler" });
// Person.insert({ firstname: "Christian", lastname: "Weber" });
// Person.insert({ firstname: "Norbert", lastname: "Hoffmann" });
// Person.insert({ firstname: "Ilona", lastname: "Hoffmann" });

// const persons = Person.select({
//   orderBy: { firstname: SortOrder.DESC, lastname: SortOrder.DESC },
//   where: { lastname: "Hoffmann" },
// });
