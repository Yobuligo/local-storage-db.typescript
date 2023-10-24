import { IRecord } from "../record/IRecord";

/**
 * An implementation of this interface provides meta information for a specific table.
 */
export interface ITableMeta extends IRecord<number> {
  autoIncrement: number;
  tableName: string;
}
