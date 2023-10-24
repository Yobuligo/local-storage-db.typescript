import { IIdGenerator } from "../idGenerator/IIdGenerator";
import { ITableConfig } from "../table/ITableConfig";
import { IdType } from "../types/IdType";
import { error } from "../utils/error/error";
import { IWhere } from "../where/IWhere";
import { IRecord } from "./IRecord";

class RecordUtilsDefault {
  doesMatchFilter<T extends IRecord<IdType>>(
    record: T,
    where: IWhere<T>
  ): boolean {
    for (const key in where) {
      // predicate can be a value of type T[key] or a IPredicate function.
      // E.g. where id = 123 or where id = gt(123)
      const predicate = where[key] ?? error();
      if (typeof predicate === "function") {
        if (!predicate(record[key])) {
          return false;
        }
      } else {
        if (record[key] !== predicate) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Creates an instance of {@link IRecord} with an id and depended of the {@link tableConfig} also with timestamps for createdAt and changedAt.
   */
  createTechnicalProps<TIdType extends IdType>(
    idGenerator: IIdGenerator<TIdType>,
    tableConfig?: ITableConfig
  ): IRecord<TIdType> {
    const id = idGenerator.next();
    if (this.needsTimestamps(tableConfig)) {
      return { id, createdAt: new Date(), changedAt: new Date() };
    } else {
      return { id };
    }
  }

  /**
   * Returns a list of records from the given {@link records} which match the given {@link where}.
   */
  filterItems<T extends IRecord<IdType>>(records: T[], where: IWhere<T>): T[] {
    return records.filter((item) => this.doesMatchFilter(item, where));
  }

  /**
   * Returns if createdAt and changedAt should be handled for the table of the given {@link tableConfig}.
   */
  needsTimestamps(tableConfig?: ITableConfig): boolean {
    return (
      !tableConfig ||
      tableConfig.timestamps === undefined ||
      tableConfig.timestamps === true
    );
  }

  /**
   * Reduces the given {@link records} by all entries,
   * which are matching the given {@link where} and returning the result list.
   *
   * @example
   * const result = reduceRecords(
   *   [
   *     { id: 1, name: "Stacey" },
   *     { id: 2, name: "Alex" },
   *   ],
   *   { name: eq("Stacey") }
   * );
   *
   * // result would be
   * [{ id: 2, name: "Alex" }];
   */
  reduceRecords<T extends IRecord<IdType>>(
    records: T[],
    where: IWhere<T>
  ): T[] {
    return records.filter((record) => !this.doesMatchFilter(record, where));
  }

  /**
   * Updates the given record {@link updateRecord} with the values of {@link record}.
   */
  updateItem<T>(
    updateRecord: T,
    record: T,
    tableConfig?: ITableConfig
  ): boolean {
    let updated = false;
    for (const prop in record) {
      if (updateRecord[prop] !== record[prop]) {
        updateRecord[prop] = record[prop];
        updated = true;
      }
    }

    if (this.needsTimestamps(tableConfig)) {
      (updateRecord as IRecord<IdType>).changedAt = new Date();
    }

    return updated;
  }
}

export const RecordUtils = new RecordUtilsDefault();
