import { MetaTable } from "../table/MetaTable";
import { IAutoIncrement } from "./IAutoIncrement";

export class AutoIncrement implements IAutoIncrement {
  private value: number = 0;

  constructor(
    private readonly metaTable: MetaTable,
    private readonly tableFileName: string
  ) {
    this.value = this.readAutoIncrement();
  }

  next(): number {
    this.value++;
    this.modifyAutoIncrement();
    return this.value;
  }

  /**
   * Reads the current auto increment value.
   * If the table is not yet registered 0 is returned.
   */
  private readAutoIncrement(): number {
    const tableMeta = this.metaTable.select({
      limit: 1,
      where: {
        tableFileName: this.tableFileName,
      },
    })[0];
    return tableMeta?.autoIncrement ?? 0;
  }

  private modifyAutoIncrement() {
    this.metaTable.modify(
      {
        autoIncrement: this.value,
        tableFileName: this.tableFileName,
      },
      { tableFileName: this.tableFileName }
    );
  }
}
