import { IRecord } from "../record/IRecord";
import { IRecordDetails } from "../record/IRecordDetails";
import { ISelectOptions } from "../select/ISelectOptions";
import { IdType } from "../types/IdType";
import { IWhere } from "../where/IWhere";
import { ITableConfig } from "./ITableConfig";
import { IUpdateResult } from "./IUpdateResult";

/**
 * An implementation of this interface represents a table which can have data of type {@link TRecord}.
 */
export interface ITable<TRecord extends IRecord<IdType>> {
  /**
   * Returns the name of this table.
   */
  readonly name: string;

  /**
   * Returns the number of records in this table.
   *
   * @example
   * const count = Person.count();
   */
  count(): number;

  /**
   * Deletes all records from that table or only records which match the {@link where} clause, if it was provided.
   *
   * @example
   * // deletes all records
   * Person.delete();
   *
   * // deletes only record with id 12 or nothing
   * Person.delete({ id: 12 });
   *
   * // deletes all records with id greater 10 or nothing
   * Person.delete({ id: gt(10) });
   *
   * // deletes all records with id greater 10 and lastname Starfish or nothing
   * Person.delete({ id: gt(10), lastname: "Starfish" });
   */
  delete(where?: IWhere<TRecord>): void;

  /**
   * Drops the current table with all its data.
   * The table will be removed from the underlying database.
   */
  drop(): void;

  /**
   * Inserts a new {@link record} to this table and returns the created object.
   * Each newly created record gets an id. Depending on the {@link ITableConfig} an auto incremented id or a uuid.
   * Each newly created record gets an createdAt and changedAt property if customized in the {@link ITableConfig}, which was provided while defining the table.
   *
   * @example
   * const person = Person.insert({ firstname: "Stacey", lastname: "Starfish" });
   */
  insert(record: IRecordDetails<TRecord>): TRecord;

  /**
   * Inserts new {@link records} to this table and returns the created objects.
   * Each newly created record gets an id. Depending on the {@link ITableConfig} an auto incremented id or a uuid.
   * Each newly created record gets an createdAt and changedAt property if customized in the {@link ITableConfig}, which was provided while defining the table.
   *
   * @example
   * const persons = Person.insert([
   *   { firstname: "Alex", lastname: "Ant" },
   *   { firstname: "Stacey", lastname: "Starfish" },
   * ]);
   */
  insert(records: IRecordDetails<TRecord>[]): TRecord[];

  /**
   * Updates all records, or those which match the {@link where} clause, with the new values of {@link record} or inserts an new record, if it doesn't exist yet.
   *
   * @example
   * // updates all records with the following
   * // or adds a new record, if no record was updated
   * Person.modify({ firstname: "Bertha", lastname: "Bear" });
   *
   * // updates all records with id greater than 10 with the following
   * // or adds a new record, if no record match the condition.
   * Person.modify({ firstname: "Bertha", lastname: "Bear" }, { id: gt(10) });
   */
  modify(record: IRecordDetails<TRecord>, where?: IWhere<TRecord>): number;

  /**
   * Returns all records of this table or all entries which match the {@link options}.
   * The option can contain a where clause or e.g. a limit to restrict the number of entries, that should be returned.
   *
   * @example
   * // returns all records of table Person
   * Person.select();
   *
   * // return all records which match the where clause
   * Person.select({ where: { id: 10 } });
   *
   * // return a max limit of records which match the where clause
   * Person.select({ limit: 3, where: { firstname: "Stacey" } });
   */
  select(options?: ISelectOptions<TRecord>): TRecord[];

  /**
   * Updates all records, or those which match the {@link where} clause, with the new values of {@link record}.
   *
   * @example
   * // updates all records by setting firstname to Stacey
   * const updateResult = Person.update({ firstname: "Stacey" });
   *
   * // updates all records by setting firstname to Stacey and lastname to Starfish, which have an id lower than 10.
   * const updateResult = Person.update({ firstname: "Stacey", lastname: "Starfish" }, { id: lt(10) });
   */
  update(
    record: Partial<IRecordDetails<TRecord>>,
    where?: IWhere<TRecord>
  ): IUpdateResult;
}
