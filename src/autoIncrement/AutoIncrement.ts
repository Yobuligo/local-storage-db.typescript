import { IDataAccessObjectMeta } from "../dataAccessObject/IDataAccessObjectMeta";
import { readLocalStorage } from "../utils/readLocalStorage";
import { writeLocalStorage } from "../utils/writeLocalStorage";
import { IAutoIncrement } from "./IAutoIncrement";

export class AutoIncrement implements IAutoIncrement {
  private value: number = 0;

  constructor(
    private readonly databaseFileName: string,
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
    const dataAccessObjectMeta = this.findDataAccessObjectMeta();
    return dataAccessObjectMeta?.autoIncrement ?? 0;
  }

  /**
   * This method is responsible for adding or updating the current auto incremented value
   * for the underlying table with the given {@link tableName}.
   */
  private modifyAutoIncrement() {
    // read all dataAccessObjectMetas from the local storage to update it
    const dataAccessObjectMetas = this.findDataAccessObjectMetas();

    // find specific dataAccessObjectMeta by the table name.
    let dataAccessObjectMeta = dataAccessObjectMetas.find(
      (dataAccessObject) => dataAccessObject.tableName === this.tableName
    );

    // if the table meta doesn't exist yet, create it and append it to the existing list
    if (!dataAccessObjectMeta) {
      dataAccessObjectMeta = this.createDataAccessObjectMeta();
      dataAccessObjectMetas.push(dataAccessObjectMeta);
    }

    // update autoIncrement value
    dataAccessObjectMeta.autoIncrement = this.value;

    // update the list
    writeLocalStorage(this.databaseFileName, dataAccessObjectMetas);
  }

  private findDataAccessObjectMeta(): IDataAccessObjectMeta | undefined {
    const dataAccessObjectMetas = this.findDataAccessObjectMetas();
    return dataAccessObjectMetas.find(
      (dataAccessObject) => dataAccessObject.tableName === this.tableName
    );
  }

  private createDataAccessObjectMeta(): IDataAccessObjectMeta {
    return { autoIncrement: 0, tableName: this.tableName };
  }

  private findDataAccessObjectMetas(): IDataAccessObjectMeta[] {
    return (
      readLocalStorage<IDataAccessObjectMeta[]>(this.databaseFileName) ?? []
    );
  }
}
