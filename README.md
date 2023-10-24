# Local Storage DB

A light weight local storage db.
Each database is stored in the local storage by the database name and prefix "db." (e.g. db.retrospective). It contains all tables of this database and currently the current auto incremented value per table.
Each table and its data are stored in a separate entry in the local storage. The corresponding key contains the database as prefix followed by the table name (e.g. db.retrospective.boards).
Each data type to be stored in a table must extend IRecord, which contains the property is and optional createdAt and changedAt.

## Create database

A database can be created via class Database.

```
const db = new Database("demo");
```

## Create table

A table can be added to a database by method define.

Create a database with table Person which contains records of type IPerson.
The api automatically sets and updates createdAt and changedAt timestamps.

```
interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

const db = new Database("demo");
const Person = db.define<IPerson>("persons").build();
```

Create a database with table Person which contains records of type IPerson.
The timestamp handling for createdAt and changedAt is disabled.

```
interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}

const db = new Database("demo");
const Person = db.define<IPerson>("persons").build({ timestamps: false });
```

Create a database with table Person which contains records of type IPerson.
The timestamp handling for createdAt and changedAt is enabled and each record gets an uuid id.

```
interface IPerson extends IRecord<string> {
  firstname: string;
  lastname: string;
}

const db = new Database("demo");
const Person = db
  .define<IPerson>("persons")
  .build({ timestamps: true, uuid: true });
```
