import { IRelationConfig } from "../Playground";
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
   */
  build<
    TSource extends IRecord<IdType>,
    TTarget extends IRelationConfig<TSource>
  >(
    config?: ITableConfig<TSource, TTarget>
  ): ITable<TRecord> & TTarget;

  /**
   * Called when a table was build.
   */
  onBuild(handler: OnTableBuildHandler): void;
}
