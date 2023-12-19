import { IRecord } from "../record/IRecord";

/**
 * An implementation of this interface provides meta information for a specific table.
 */
export interface ITableMeta extends IRecord<number> {
  /**
   * Returns the current auto incremented value.
   */
  autoIncrement: number;

  /**
   * Returns the table file name.
   *
   * @example
   * db.demo.persons
   */
  tableFileName: string;
}
