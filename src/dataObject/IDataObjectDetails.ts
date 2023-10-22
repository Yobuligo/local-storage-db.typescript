import { IDataObject } from "./IDataObject";

export type IDataObjectDetails<T extends IDataObject> = Omit<
  T,
  "id" | "createdAt" | "changedAt"
>;
