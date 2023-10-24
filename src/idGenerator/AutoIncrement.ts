import { MetaTable } from "../table/MetaTable";
import { IAutoIncrement } from "./IAutoIncrement";

export class AutoIncrement implements IAutoIncrement {
  private value: number = 0;

  constructor(
    private readonly metaTable: MetaTable,
    private readonly tableName: string
  ) {
    this.value = this.readAutoIncrement();
  }

  next(): number {
    this.value++;
    this.modifyAutoIncrement();
    return this.value;
  }

  private readAutoIncrement(): number {
    const tableMeta = this.metaTable.select({
      limit: 1,
      where: {
        tableName: this.tableName,
      },
    })[0];
    return tableMeta?.autoIncrement ?? 0;
  }

  private modifyAutoIncrement() {
    this.metaTable.modify(
      {
        autoIncrement: this.value,
        tableName: this.tableName,
      },
      { tableName: this.tableName }
    );
  }
}
