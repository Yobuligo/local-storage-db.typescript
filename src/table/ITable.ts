import { IRecord } from "../record/IRecord";
import { IRecordDetails } from "../record/IRecordDetails";
import { ISelectOptions } from "../select/ISelectOptions";
import { IdType } from "../types/IdType";
import { IWhere } from "../where/IWhere";
import { IUpdateResult } from "./IUpdateResult";

/**
 * An implementation of this interface represents a table which can have data of type {@link TRecord}.
 */
export interface ITable<TRecord extends IRecord<IdType>> {
  readonly name: string;
  count(): number;
  delete(where?: IWhere<TRecord>): void;
  insert(record: IRecordDetails<TRecord>): TRecord;
  insert(records: IRecordDetails<TRecord>[]): TRecord[];
  modify(record: IRecordDetails<TRecord>, where?: IWhere<TRecord>): number;
  select(options?: ISelectOptions<TRecord>): TRecord[];
  update(
    record: Partial<IRecordDetails<TRecord>>,
    where?: IWhere<TRecord>
  ): IUpdateResult;
}
