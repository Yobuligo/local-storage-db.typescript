import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";
import { MemoryStorage } from "./storage/MemoryStorage";
import { StorageFactory } from "./storage/StorageFactory";
import { Table } from "./table/Table";

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

interface IDriverLicense extends IRecord<number> {
  description: string;
}

interface IIdentityCard extends IRecord<number> {
  date: Date;
}

interface ICertificate extends IRecord<number> {}

StorageFactory.storageType = MemoryStorage;

class DTask extends Table<ITask> {
  readonly person = this.oneToOne(DPerson);
}

class DPerson extends Table<IPerson> {
  /**
   * Returns the tasks of the current person
   */
  readonly tasks = this.oneToMany(DTask);

  /**
   * Returns the driver license of the given person
   */
  readonly driverLicense = this.oneToOne(DDriverLicense);

  /**
   * Returns the certificates of the current selected person
   */
  readonly certificates = this.oneToMany(DCertificate);

  /**
   * Returns the cars of the current person
   */
  readonly cars = this.manyToMany(DCard)
}

class DDriverLicense extends Table<IDriverLicense> {}

class DIdentityCard extends Table<IIdentityCard> {}

class DCertificate extends Table<ICertificate> {}

class DCard extends Table<ICar>{}

const db = new Database("demo");
const Task = db.define<ITask>("tasks").build({ tableType: DTask });
const Person = db.define<IPerson>("persons").build({ tableType: DPerson });
Person.

// type IConfig<TRecord extends IRecord<IdType>, TTable extends Table<TRecord>> = {
//   type?: TableConstructor<TRecord, TTable>;
//   uuid?: boolean;
// };

// interface IBuilder<TRecord extends IRecord<any>> {
//   build<TTable extends Table<TRecord>>(
//     config?: IConfig<TRecord, TTable>
//   ): TTable;
// }

// const define = <T extends IRecord<any>>(name: string): IBuilder<T> => {
//   throw new Error();
// };

// const MyTable = define<IPerson>("persons").build({ type: DPerson });

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
