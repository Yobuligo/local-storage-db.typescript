import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { IWhere } from "../where/IWhere";

/**
 * An implementation of this interface provides all options which are required for selecting data.
 */
export interface ISelectOptions<TRecord extends IRecord<IdType>> {
  /**
   * Returns the max number of entries that should be returned via select.
   */
  limit?: number;

  /**
   * Returns the where clause for a select. Only records which match this condition(s) are returned.
   */
  where?: IWhere<TRecord>;
}
