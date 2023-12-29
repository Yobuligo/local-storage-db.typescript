import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { ITable } from "./ITable";
import { ITableConfig } from "./ITableConfig";
import { OnTableBuildHandler } from "./OnTableBuildHandler";

/**
 * An implementation of this interface is responsible for building a {@link ITable}.
 */
export interface ITableBuilder<TRecord extends IRecord<IdType>> {
  /**
   * Creates a {@link ITable} with the given {@link config}.
   * The {@link config} contains a property relations. To return these relations in a type safe way,
   * the generic type {@link TRelationConfig} is introduced, that contains the relation information.
   * The return value is not only a {@link ITable} but also contains the relations.
   */
  build(config?: ITableConfig): ITable<TRecord>;

  /**
   * Called when a table was build.
   */
  onBuild(handler: OnTableBuildHandler): void;
}
