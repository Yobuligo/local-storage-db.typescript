import { Database } from "./database/Database";
import { IRecord } from "./record/IRecord";
import { Table } from "./table/Table";

interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

interface ICertificate extends IRecord<number> {
  title: string;
}

class DCertificate extends Table<ICertificate> {}

class DPerson extends Table<IPerson> {}

const db = new Database("demo")
const Person = db.define<IPerson>("persons").build({tableDefinition: DPerson})
