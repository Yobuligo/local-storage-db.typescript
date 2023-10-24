# Local Storage DB
A light weight local storage db.
Each database is stored in the local storage by the database name and prefix "db." (e.g. db.retrospective). It contains all tables of this database and currently the current auto incremented value per table.
Each table and its data are stored in a separate entry in the local storage. The corresponding key contains the database as prefix followed by the table name (e.g. db.retrospective.boards).
Each data type to be stored in a table must extend IRecord, which contains the property is and optional createdAt and changedAt.

## Create database and table
The following examples show how to create a database and a table

```interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

// Creates a database and a table Person of type IPerson.
// The api automatically sets and updates createdAt and changedAt
const db = new Database("demo");
const Person = db.define<IPerson>("persons").build();
```
