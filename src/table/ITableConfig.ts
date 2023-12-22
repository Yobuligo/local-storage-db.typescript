import { IRecord } from "../record/IRecord";
import { IRelationConfig } from "../relations/IRelationConfig";
import { IdType } from "../types/IdType";

/**
 * An implementation of this interface provides information on how to configure a table, when it is defined.
 */
export interface ITableConfig<
  TSource extends IRecord<IdType>,
  TRelationConfig extends IRelationConfig<TSource>
> {
  /**
   * Defines the relations for an entity of type {@link TSource}.
   *
   * @example
   * const db: IDatabase = new Database("demo");
   * const Task = db.define<ITask>("tasks").build();
   * const Car = db.define<ICar>("cars").build();
   * const Person = db.define<IPerson>("persons").build({
   *   relations: {
   *     tasks: oneToOne(Task),
   *     cars: oneToOne(Car),
   *   },
   * });
   */
  relations?: TRelationConfig;

  /**
   * Defines if timestamps for createdAt and changedAt are handled by the api.
   * This means whenever an entry is added or updated the corresponding timestamp is set or updated.
   * If {@link timestamps} is undefined created and changedAt are also handled automatically.
   */
  timestamps?: boolean;

  /**
   * Returns if uuids should be used as id instead of auto incremented number values. The generated uuids have the following format:
   *
   * @example
   * 06ddd09b-c730-4ffd-9db9-9e433aa74489
   */
  uuid?: boolean;
}
