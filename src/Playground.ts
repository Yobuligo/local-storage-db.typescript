import { Database } from "./database/Database";
import { IDatabase } from "./database/IDatabase";
import { IRecord } from "./record/IRecord";
import { oneToMany } from "./relations/oneToMany";
import { oneToOne } from "./relations/oneToOne";
import { MemoryStorage } from "./storage/MemoryStorage";
import { StorageFactory } from "./storage/StorageFactory";
import { SortOrder } from "./types/SortOrder";

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

const db: IDatabase = new Database("demo");
const Task = db.define<ITask>("tasks").build();
const Car = db.define<ICar>("cars").build();
const Person = db.define<IPerson>("persons").build({
  relations: {
    cars: oneToOne(Car),
    tasks: oneToMany(Task),
  },
});

Task.select


const task = Task.insert({ title: "Test" });
const person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
const car = Car.insert({ brand: "BMW" });

Person.tasks.insert(person, task);
Person.tasks.delete(person, task);
Person.cars.insert(person, car);

Person.insert({ firstname: "Rene", lastname: "Hoffmann" });
Person.insert({ firstname: "Johann", lastname: "Vogel" });
Person.insert({ firstname: "Peter", lastname: "Hoffmann" });
Person.insert({ firstname: "Ilona", lastname: "Amsel" });
Person.insert({ firstname: "Andreas", lastname: "Schöttler" });
Person.insert({ firstname: "Ilona", lastname: "Zilpzalp" });
Person.insert({ firstname: "Verena", lastname: "Tewes" });
Person.insert({ firstname: "Steffen", lastname: "Hoffmann" });
Person.insert({ firstname: "Mathias", lastname: "Groppler" });
Person.insert({ firstname: "Christian", lastname: "Weber" });
Person.insert({ firstname: "Norbert", lastname: "Hoffmann" });
Person.insert({ firstname: "Ilona", lastname: "Hoffmann" });

const persons = Person.select({
  orderBy: { firstname: SortOrder.DESC, lastname: SortOrder.DESC },
  where: { lastname: "Hoffmann" },
});
