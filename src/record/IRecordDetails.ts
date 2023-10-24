import { IRecord } from "./IRecord";
import { IdType } from "../types/IdType";

/**
 * This type provides the properties of the given record type {@link TRecord} beside the technical fields id, createdAt and changedAt.
 */
export type IRecordDetails<TRecord extends IRecord<IdType>> = Omit<
  TRecord,
  "id" | "createdAt" | "changedAt"
>;
