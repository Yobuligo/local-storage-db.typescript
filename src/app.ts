import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";

interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

// Creates a database and a table Person of type IPerson.
// The api automatically sets and updates createdAt and changedAt
const db = new Database("demo");
const Person = db.define<IPerson>("persons").build();

// Creates a database and a table Person of type IPerson.
// Timestamp handling for createdAt and changedAt is disabled
const db = new Database("demo");
const Person = db.define<IPerson>("persons").build({ timestamps: false });

interface IPerson extends IRecord<string> {
  firstname: string;
  lastname: string;
}

// Creates a database and a table Person of type IPerson.
// Timestamp handling for createdAt and changedAt is enabled
// An uuid is provided for each record as id
const db = new Database("demo");
const Person = db
  .define<IPerson>("persons")
  .build({ timestamps: true, uuid: true });

