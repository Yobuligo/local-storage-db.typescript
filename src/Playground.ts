import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";
import { MemoryStorage } from "./storage/MemoryStorage";
import { StorageFactory } from "./storage/StorageFactory";
import { Table } from "./table/Table";

interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

interface ICertificate extends IRecord<number> {
  title: string;
}

class DCertificate extends Table<ICertificate> {}

class DPerson extends Table<IPerson> {
  /**
   * Access the certificates of a person
   */
  certificates = this.oneToMany(DCertificate);
}

StorageFactory.storageType = MemoryStorage

const db = new Database("demo");
const Certificate = db
  .define<ICertificate>("certificates")
  .build({ tableDefinition: DCertificate });

const certificate = Certificate.insert({ title: "Bachelor" });
const certificates = Certificate.select();

const Person = db
  .define<IPerson>("persons")
  .build({ tableDefinition: DPerson });

const person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });

const persons = Person.select();

debugger;
// Person.certificates.insert(person, certificate);
