declare const Todo: () => never;
declare const readLocalStorage: <T>(key: string) => T | undefined;
declare const writeLocalStorage: <T>(key: string, data: T) => void;
declare const deleteLocalStorage: (key: string) => void;
interface IHaveFileName {
    readonly fileName: string;
}
interface IDatabase extends IHaveFileName {
    create<T extends IDataObject>(name: string): ITable<T>;
    readonly name: string;
    readonly tables: ITable<any>[];
}
interface IDatabaseRepository {
}
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
declare class DatabaseRepository implements IDatabaseRepository {
}
declare class Database implements IDatabase {
    readonly name: string;
    readonly fileName: string;
    readonly tables: ITable<any>[];
    constructor(name: string);
    create<T extends IDataObject>(name: string): ITable<T>;
}
declare class Table<T extends IDataObject> implements ITable<T> {
    readonly name: string;
    private database;
    readonly fileName: string;
    constructor(name: string, database: IDatabase);
    delete(dataObject: T): boolean;
    deleteById(id: number): boolean;
    findAll(): T[];
    findById(id: number): T | undefined;
    insert(dataObject: IDataObjectDetails<T>): T;
    update(dataObject: T): T;
}
interface IPerson extends IDataObject {
    age: number;
    firstname: string;
    lastname: string;
}
declare const db: Database;
declare const table: ITable<IPerson>;
declare const data: IPerson[];
