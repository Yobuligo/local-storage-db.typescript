import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { ITable } from "./ITable";
import { TableConstructor } from "./TableConstructor";

/**
 * An implementation of this interface provides information on how to configure a table, when it is defined.
 */
export interface ITableConfig<
  TRecord extends IRecord<IdType>,
  TTable extends ITable<TRecord>
> {
  /**
   * Returns a table definition which contains specific relations.
   */
  readonly tableDefinition?: TableConstructor<TRecord, TTable>;

  /**
   * Defines if timestamps for createdAt and changedAt are handled by the api.
   * This means whenever an entry is added or updated the corresponding timestamp is set or updated.
   * If {@link timestamps} is undefined created and changedAt are also handled automatically.
   */
  readonly timestamps?: boolean;

  /**
   * Returns if uuids should be used as id instead of auto incremented number values. The generated uuids have the following format:
   *
   * @example
   * 06ddd09b-c730-4ffd-9db9-9e433aa74489
   */
  readonly uuid?: boolean;
}
