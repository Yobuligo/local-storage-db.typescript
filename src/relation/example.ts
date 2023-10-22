import { IDataAccessObject } from "../dataAccessObject/IDataAccessObject";
import { IDataObject } from "../dataObject/IDataObject";
import { IFilter } from "../filter/IFilter";
import { eq } from "../filter/Operator";

interface IPerson extends IDataObject {
  firstname: string;
}

interface ILicense extends IDataObject {
  photo: string;
}

interface ICar extends IDataObject {
  name: string;
}

interface ICertificate extends IDataObject {
  date: Date;
}

interface IBoard extends IDataObject {
  name: string;
}

interface INote extends IDataObject {
  text: string;
}

interface IRelation<TSource extends IDataObject, TTarget extends IDataObject> {
  readonly relationName: string;
}

interface IOneToOne<TSource extends IDataObject, TTarget extends IDataObject>
  extends IRelation<TSource, TTarget> {
  set(dataObject: TSource, relatedDataObject: TTarget): void;
  get(dataObject: TSource): TTarget | undefined;
}

interface IOneToMany<TSource extends IDataObject, TTarget extends IDataObject>
  extends IRelation<TSource, TTarget> {
  add(dataObject: TSource, relatedDataObject: TTarget): void;
  add(dataObject: TSource, relatedDataObjects: TTarget[]): void;
  contains(dataObject: TSource, relatedObject: TTarget): boolean;
  containsNot(dataObject: TSource, relatedObject: TTarget): boolean;
  count(dataObject: TSource): number;
  findAll(dataObject: TSource, filter?: IFilter<TTarget>): TTarget[];
  delete(dataObject: TSource, relatedDataObject: TTarget): void;
  delete(dataObject: TSource, relatedDataObjects: TTarget[]): void;
  deleteAll(dataObject: TSource, filter?: IFilter<TTarget>): void;
  first(dataObject: TSource): TTarget | undefined;
  last(dataObject: TSource): TTarget | undefined;
}

const oneToOne = <TSource extends IDataObject, TTarget extends IDataObject>(
  sourceDataAccessObject: IDataAccessObject<TSource>,
  targetDataAccessObject: IDataAccessObject<TTarget>
): IOneToOne<TSource, TTarget> => {
  throw new Error();
};

const oneToMany = <TSource extends IDataObject, TTarget extends IDataObject>(
  sourceDataAccessObject: IDataAccessObject<TSource>,
  targetDataAccessObject: IDataAccessObject<TTarget>
): IOneToMany<TSource, TTarget> => {
  throw new Error();
};

type RelationConfig<T extends IDataObject> = {
  [key: string]: IRelation<T, any>;
};

const person: IPerson = { id: 123, firstname: "Stacey" };
const certificate: ICertificate = { id: 123, date: new Date() };
const car: ICar = { id: 123, name: "BMW" };
const board: IBoard = { id: 123, name: "Sprint Review" };

interface IBuilder<T extends IDataObject> {
  build<TRelation extends RelationConfig<T>>(configure?: (dataAccessObject: IDataAccessObject<T>)=>TRelation
  ): IDataAccessObject<T> & TRelation;
}

const define = <T extends IDataObject>(name: string): IBuilder<T> => {
  throw new Error();
};

const Note = define<INote>("notes").build()

const Board = define<IBoard>("boards").build((Board)=>{
  return {
    notes: oneToMany(Board, Note)
  }
});


const notes = Board.notes.findAll(board);
Board.notes.deleteAll(board, { text: eq("Sprint Review") });
