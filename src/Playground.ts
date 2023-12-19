import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";
import { MemoryStorage } from "./storage/MemoryStorage";
import { StorageFactory } from "./storage/StorageFactory";

interface IPerson extends IRecord<number> {
  firstname: string;
}

interface ITask extends IRecord<number> {
  title: string;
}

StorageFactory.storageType = MemoryStorage;

const db = new Database("demo");
const Person = db.define<IPerson>("persons").build();

const person = Person.insert({ firstname: "Test" });

const Task = db.define<ITask>("tasks").build();
const task = Task.insert({ title: "Hello" });

db.drop();

const persoNCount = Person.count();
const taskCount = Task.count();
const metaTable = db.metaTable.count();
