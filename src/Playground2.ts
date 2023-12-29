namespace Playground {
  type IdType = string | number;

  interface IRecord<TId extends IdType> {
    id: TId;
  }

  interface IPerson extends IRecord<number> {}

  interface IRelation<
    TSource extends IRecord<IdType>,
    TTarget extends IRecord<IdType>
  > {
    source: TSource;
    target: TTarget;
  }

  interface IOneToOne<
    TSource extends IRecord<IdType>,
    TTarget extends IRecord<IdType>
  > extends IRelation<TSource, TTarget> {}

  interface IOneTOMany<
    TSource extends IRecord<IdType>,
    TTarget extends IRecord<IdType>
  > extends IRelation<TSource, TTarget> {}

  interface IManyToMany<
    TSource extends IRecord<IdType>,
    TTarget extends IRecord<IdType>
  > extends IRelation<TSource, TTarget> {}

  interface ITable {}

  abstract class Table<TSource extends IRecord<IdType>> {
    protected oneToOne<TTarget extends IRecord<IdType>>(): IOneToOne<
      TSource,
      TTarget
    > {
      throw new Error();
    }

    protected oneToMany<TTarget extends IRecord<IdType>>(): IOneTOMany<
      TSource,
      TTarget
    > {
      throw new Error();
    }

    protected manyToMany<TTarget extends IRecord<IdType>>(): IManyToMany<
      TSource,
      TTarget
    > {
      throw new Error();
    }
  }
}
