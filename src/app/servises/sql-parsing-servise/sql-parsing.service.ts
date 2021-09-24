import { Injectable } from '@angular/core';

import {
  ALL_TABLE_REGEXP,
  FOREIGN_KEYS_REGEXP,
  FOREIGN_KEYS_REGEXP_2,
  PRIMARY_KEYS_REGEXP,
  PRIMARY_KEYS_SPLIT_REGEXP,
  ATTRIBUTE_REGEXP,
  COLUMNS_SPLIT_REGEXP,
  CHECK_FOREIGN_KEY_REGEXP,
  CHECK_PRIMARY_KEY_REGEXP,
  CHECK_PRIMARY_KEY_REGEXP_2
} from './sql-parsing.constants';

import {
  SchemeDescription,
  ColumnDescription, 
  TableDescription,
  ForeignKeyDescription
} from '../../model/table.model'; 


@Injectable({
  providedIn: 'root'
})
export class SqlParsingService {

  public parseDataFromFile(data: string): SchemeDescription {
    const regexp: RegExp = new RegExp(ALL_TABLE_REGEXP, "gi");
    const scheme: SchemeDescription = (
      Array
        .from(data.matchAll(regexp))
        .map((table: RegExpMatchArray) =>
          this.getTable(table)
        )
    );
    
    return scheme;
  }

  public getForeignKey(data: string): ForeignKeyDescription {
    const regexp: RegExp = new RegExp(FOREIGN_KEYS_REGEXP_2, "i");
    const [_, currentAttr, targetTable, targetAttr]: RegExpMatchArray = data.match(regexp) ?? [];
    return { currentAttr, targetTable, targetAttr };
  }

  public getPrimaryKeys(data: string): string[] {
    const regexp: RegExp = new RegExp(PRIMARY_KEYS_REGEXP, "i");
    const [_, stringPKeys]: RegExpMatchArray = data.match(regexp) ?? [];
    return stringPKeys.split(new RegExp(PRIMARY_KEYS_SPLIT_REGEXP));
  }

  public getAttribute(data: string): ColumnDescription {
    const regexp: RegExp = new RegExp(ATTRIBUTE_REGEXP, "i");
    const [_, attrName, attrType]: RegExpMatchArray = data.match(regexp) ?? [];
    return {attrName, attrType};
  }

  public getTable(result: RegExpMatchArray): TableDescription {
    const [_, tableName, tableColumns]: RegExpMatchArray = result ?? [];

    let primaryKeys: string[] = [];
    let foreignKeys: ForeignKeyDescription[] = [];
    let attrs: ColumnDescription[] = [];

    tableColumns
      .split(new RegExp(COLUMNS_SPLIT_REGEXP, "gi"))
      .forEach((column: string) => {
        if (new RegExp(CHECK_FOREIGN_KEY_REGEXP, "gi").test(column)) {
          foreignKeys.push(this.getForeignKey(column));
        } else if (new RegExp(CHECK_PRIMARY_KEY_REGEXP, "gi").test(column)) {
            primaryKeys = this.getPrimaryKeys(column);
        } else {
            const attr = this.getAttribute(column);
            attrs.push(attr);

            let regexp = /references/gi;
            if (regexp.test(column)) {  
              regexp = /references\s+([\w\d_]+)\(([\w\d_]+)\)/i;
              let [_, targetTable, targetAttr] = column.match(regexp) ?? [];
              foreignKeys.push({
                currentAttr: attr.attrName,
                targetTable,
                targetAttr
              });

            }

            if (new RegExp(CHECK_PRIMARY_KEY_REGEXP_2, "gi").test(column)) {
              primaryKeys.push(attr.attrName);
            }
          }
      });

    return {
      tableName: tableName,
      columns: attrs,
      primaryKeys: primaryKeys,
      foreignKeys: foreignKeys
    };
  }
}
