import { IDatabase } from "../database/IDatabase";
import { IIdGenerator } from "../idGenerator/IIdGenerator";
import { IRecord } from "../record/IRecord";
import { IRecordDetails } from "../record/IRecordDetails";
import { RecordUtils } from "../record/RecordUtils";
import { IManyToMany } from "../relations/IManyToMany";
import { IOneToMany } from "../relations/IOneToMany";
import { IOneToOne } from "../relations/IOneToOne";
import { ISelectOptions } from "../select/ISelectOptions";
import { IStorage } from "../storage/IStorage";
import { IdType } from "../types/IdType";
import { IWhere } from "../where/IWhere";
import { ITable } from "./ITable";
import { ITableConfig } from "./ITableConfig";
import { IUpdateResult } from "./IUpdateResult";
import { TableConstructor } from "./TableConstructor";

/**
 * This class represents each type of table.
 * A table is required to write data into, read or delete data from it.
 */
export class Table<TRecord extends IRecord<IdType>> implements ITable<TRecord> {
  private _isDropped = false;

  constructor(
    readonly name: string,
    private readonly database: IDatabase,
    private readonly storage: IStorage<TRecord>,
    private readonly idGenerator: IIdGenerator<IdType>,
    private readonly tableConfig?: ITableConfig<TRecord, ITable<TRecord>>
  ) {}

  count(): number {
    const records = this.select();
    return records.length;
  }

  delete(where?: IWhere<TRecord> | undefined): void {
    if (!where) {
      this.storage.write([]);
      return;
    }

    let records = this.select();
    const length = records.length;
    if (length > 0) {
      records = RecordUtils.reduceRecords(records, where);
      this.storage.write(records);
    }
  }

  drop(): boolean {
    this.database.dropTable(this);
    this._isDropped = true;
    return true;
  }

  insert(record: IRecordDetails<TRecord>): TRecord;
  insert(records: IRecordDetails<TRecord>[]): TRecord[];
  insert(records: unknown): TRecord | TRecord[] {
    if (Array.isArray(records)) {
      return this.insertRecords(records as IRecordDetails<TRecord>[]);
    } else {
      return this.insertRecord(records as IRecordDetails<TRecord>);
    }
  }

  get isDropped(): boolean {
    return this._isDropped;
  }

  modify(
    record: IRecordDetails<TRecord>,
    where?: IWhere<TRecord> | undefined
  ): number {
    const updateResult = this.update(record, where);

    // only insert a new entry, if no entry was found.
    // Return 0 in case an entry was found but not updated, because the props already were up to date
    if (updateResult.numberFindings === 0) {
      this.insert(record);
      return 1;
    }
    return updateResult.numberChanges;
  }

  select(options?: ISelectOptions<TRecord>): TRecord[] {
    let records = this.storage.read();
    if (options && options.where) {
      records = RecordUtils.filterItems(records, options.where);
    }

    if (options && options.limit !== undefined) {
      records = records.slice(0, options.limit);
    }

    if (
      options &&
      options.orderBy !== undefined &&
      Object.keys(options.orderBy).length > 0
    ) {
      records = RecordUtils.orderBy(records, options.orderBy);
    }
    return records;
  }

  update(
    record: Partial<IRecordDetails<TRecord>>,
    where?: IWhere<TRecord> | undefined
  ): IUpdateResult {
    const updateResult: IUpdateResult = { numberChanges: 0, numberFindings: 0 };
    const records = this.select();
    records.forEach((updateRecord) => {
      if (!where || RecordUtils.doesMatchFilter(updateRecord, where)) {
        updateResult.numberFindings++;
        if (RecordUtils.updateItem(updateRecord, record, this.tableConfig)) {
          updateResult.numberChanges++;
        }
      }
    });
    if (updateResult.numberChanges > 0) {
      this.storage.write(records);
    }
    return updateResult;
  }

  protected manyToMany<
    TTarget extends IRecord<IdType>,
    TTable extends ITable<TTarget>
  >(
    tableDefinition: TableConstructor<TTarget, TTable>
  ): IManyToMany<TRecord, TTarget> {
    throw new Error();
  }

  protected oneToMany<
    TTarget extends IRecord<IdType>,
    TTable extends ITable<TTarget>
  >(
    tableDefinition: TableConstructor<TTarget, TTable>
  ): IOneToMany<TRecord, TTarget> {
    throw new Error();
  }

  protected oneToOne<
    TTarget extends IRecord<IdType>,
    TTable extends ITable<TTarget>
  >(
    tableDefinition: TableConstructor<TTarget, TTable>
  ): IOneToOne<TRecord, TTarget> {
    throw new Error();
  }

  private insertRecords(recordDetails: IRecordDetails<TRecord>[]): TRecord[] {
    const newRecords: TRecord[] = [];
    recordDetails.forEach((recordDetails) => {
      const newRecord = this.createRecord(recordDetails);
      newRecords.push(newRecord);
    });
    this.storage.append(newRecords);
    return newRecords;
  }

  private insertRecord(recordDetails: IRecordDetails<TRecord>): TRecord {
    const newRecord = this.createRecord(recordDetails);
    this.storage.append(newRecord);
    return newRecord;
  }

  private createTechnicalProps(): IRecord<IdType> {
    return RecordUtils.createTechnicalProps(this.idGenerator, this.tableConfig);
  }

  private createRecord(recordDetails: IRecordDetails<TRecord>): TRecord {
    const technicalProps = this.createTechnicalProps();
    return { ...recordDetails, ...technicalProps } as TRecord;
  }
}
