const Todo = (): never => {
  throw new Error();
};

const readLocalStorage = <T>(key: string): T | undefined => {
  const item = localStorage.getItem(key);
  if (!item) {
    return undefined;
  }
  return JSON.parse(item);
};

const writeLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const deleteLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

interface IHaveFileName {
  readonly fileName: string;
}

interface IDatabase extends IHaveFileName {
  create<T extends IDataObject>(name: string): ITable<T>;
  readonly name: string;
  readonly tables: ITable<any>[];
}

interface IDatabaseRepository {}

interface ITable<T extends IDataObject> extends IHaveFileName {
  readonly name: string;
  delete(dataObject: T): boolean;
  deleteById(id: number): boolean;
  findAll(): T[];
  findById(id: number): T | undefined;
  insert(dataObject: IDataObjectDetails<T>): T;
  update(dataObject: T): T;
}

interface IDataObject {
  id: number;
}

type IDataObjectDetails<T extends IDataObject> = Omit<T, "id">;

class DatabaseRepository implements IDatabaseRepository {}

class Database implements IDatabase {
  readonly fileName: string;
  readonly tables: ITable<any>[] = [];

  constructor(readonly name: string) {
    this.fileName = `db.${name}`;
  }

  create<T extends IDataObject>(name: string): ITable<T> {
    return new Table(name, this);
  }
}

class Table<T extends IDataObject> implements ITable<T> {
  readonly fileName: string;

  constructor(readonly name: string, private database: IDatabase) {
    this.fileName = `${database.fileName}.${name}`;
  }

  delete(dataObject: T): boolean {
    throw new Error("Method not implemented.");
  }

  deleteById(id: number): boolean {
    throw new Error("Method not implemented.");
  }

  findAll(): T[] {
    return readLocalStorage(this.fileName) ?? [];
  }

  findById(id: number): T | undefined {
    const data = this.findAll();
    for (const item of data) {
      if (item.id === id) {
        return item;
      }
    }
  }

  insert(dataObject: IDataObjectDetails<T>): T {
    throw new Error("Method not implemented.");
  }

  update(dataObject: T): T {
    throw new Error("Method not implemented.");
  }
}

interface IPerson extends IDataObject {
  age: number;
  firstname: string;
  lastname: string;
}

const db = new Database("retrospective");
const table = db.create<IPerson>("/users");
const data = table.findAll();
debugger
// const person = table.insert({
//   age: 27,
//   firstname: "Stacey",
//   lastname: "Starfish",
// });
