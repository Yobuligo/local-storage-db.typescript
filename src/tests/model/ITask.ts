import { IRecord } from "../../record/IRecord";

export interface ITask extends IRecord<number> {
  title: string;
  description: string;
}
