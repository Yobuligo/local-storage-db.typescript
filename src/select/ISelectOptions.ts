import { IRecord } from "../record/IRecord";
import { IdType } from "../types/IdType";
import { IWhere } from "../where/IWhere";

/**
 * An implementation of this interface provides all options which are required for selecting data.
 */
export interface ISelectOptions<TRecord extends IRecord<IdType>> {
  /**
   * Returns the max number of selected entries that should be returned.
   */
  limit?: number;
  where?: IWhere<TRecord>;
}
