"use strict";
const Todo = () => {
    throw new Error();
};
const readLocalStorage = (key) => {
    const item = localStorage.getItem(key);
    if (!item) {
        return undefined;
    }
    return JSON.parse(item);
};
const writeLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
};
class DatabaseRepository {
}
class Database {
    constructor(name) {
        this.name = name;
        this.tables = [];
        this.fileName = `db.${name}`;
    }
    create(name) {
        return new Table(name, this);
    }
}
class Table {
    constructor(name, database) {
        this.name = name;
        this.database = database;
        this.fileName = `${database.fileName}.${name}`;
    }
    delete(dataObject) {
        throw new Error("Method not implemented.");
    }
    deleteById(id) {
        throw new Error("Method not implemented.");
    }
    findAll() {
        var _a;
        return (_a = readLocalStorage(this.fileName)) !== null && _a !== void 0 ? _a : [];
    }
    findById(id) {
        const data = this.findAll();
        for (const item of data) {
            if (item.id === id) {
                return item;
            }
        }
    }
    insert(dataObject) {
        throw new Error("Method not implemented.");
    }
    update(dataObject) {
        throw new Error("Method not implemented.");
    }
}
const db = new Database("retrospective");
const table = db.create("/users");
const data = table.findAll();
debugger;
// const person = table.insert({
//   age: 27,
//   firstname: "Stacey",
//   lastname: "Starfish",
// });
//# sourceMappingURL=app.js.map