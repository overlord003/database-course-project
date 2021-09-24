export type SchemeDescription = TableDescription[];

export interface TableDescription {
  tableName: string,
  columns: ColumnDescription[],
  primaryKeys?: PrimaryKeyDescription[],
  foreignKeys?: ForeignKeyDescription[]
};

export interface ColumnDescription {
  attrName: string,
  attrType: string
}

export type PrimaryKeyDescription = string;

export interface ForeignKeyDescription {
  currentAttr: string,
  targetTable: string,
  targetAttr: string
};