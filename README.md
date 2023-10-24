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

## Insert records

Inserts can be executed via function insert at the table.

Insert a new record to table Person and get the person object as return.

```
const person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
```

Insert new records and get the person objects as return.

```
const persons = Person.insert([
  { firstname: "Alex", lastname: "Ant" },
  { firstname: "Stacey", lastname: "Starfish" },
]);
```

## Select records

Selects can be executed via function select at the table.

Return all records of table Person:

```
const persons = Person.select();
```

Return all records which match the where clause:

```
const persons = Person.select({ where: { id: 10 } });
```

Return a max limit of records which match the where clause

```
const persons = Person.select({ limit: 3, where: { firstname: "Stacey" } });
```

## Update records

Updates can be executed via function update at the table.

Updates all records by setting firstname to Stacey.

```
const updateResult = Person.update({ firstname: "Stacey" });
```

Updates all records by setting firstname to Stacey and lastname to Starfish, which have an id lower than 10 or update nothing if not found.

```
const updateResult = Person.update(
  { firstname: "Stacey", lastname: "Starfish" },
  { id: lt(10) }
);
```

## Delete records

Deletes can be executed via function delete at the table.

Deletes all records from table Person.

```
Person.delete();
```

Deletes only record with id 12 or nothing

```
Person.delete({ id: 12 });
```

Deletes all records with id greater 10 or nothing

```
Person.delete({ id: gt(10) });
```

Deletes all records with id greater 10 and lastname Starfish or nothing

```
Person.delete({ id: gt(10), lastname: "Starfish" });
```
