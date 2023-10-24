import { IRecord } from "../../record/IRecord";

export interface IPerson extends IRecord<number> {
  firstname: string;
  lastname: string;
}
