import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";
import { MemoryStorage } from "./storage/MemoryStorage";
import { StorageFactory } from "./storage/StorageFactory";

interface IPerson extends IRecord<number> {
  firstname: string;
}

StorageFactory.storageType = MemoryStorage;
const db = new Database("demo");
const Person = db.define<IPerson>("persons").build();
const person = Person.insert({ firstname: "Test" });
Person.drop();
