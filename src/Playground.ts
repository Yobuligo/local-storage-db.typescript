import { Database } from "./database/Database";
import { IDatabase } from "./database/IDatabase";
import { IRecord } from "./record/IRecord";
import { MemoryStorage } from "./storage/MemoryStorage";
import { StorageFactory } from "./storage/StorageFactory";
import { ITable } from "./table/ITable";
import { IdType } from "./types/IdType";
import { SortOrder } from "./types/SortOrder";

interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

interface ITask extends IRecord<number> {
  title: string;
}

StorageFactory.storageType = MemoryStorage;

const db: IDatabase = new Database("demo");
const Person = db.define<IPerson>("persons").build();
const Task = db.define<ITask>("tasks").build();

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

persons.forEach((person) =>
  console.log(`${person.firstname} ${person.lastname}`)
);

Person.select({
  where: { lastname: "Starfish" },
  orderBy: { firstname: SortOrder.ASC },
});

interface IRelation<
  TSource extends IRecord<IdType>,
  TTarget extends IRecord<IdType>
> {
  source: TSource;
  target: TTarget;
}

export type IRelationConfig<TSource extends IRecord<IdType>> = {
  [key: string]: IRelation<TSource, any>;
};

const oneToOne = <
  TSource extends IRecord<IdType>,
  TTarget extends IRecord<IdType>
>(
  target: ITable<TTarget>
): IRelation<TSource, TTarget> => {
  throw new Error();
};

const Test = db.define<IPerson>("test2").build({
  relations: {
    tasks: oneToOne(Task),
  },
});
