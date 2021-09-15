import { Component, OnInit, ViewChild} from '@angular/core';

import {MyTableComponent} from '../my-table/my-table.component';

import { Node, Edge } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-my-graph',
  templateUrl: './my-graph.component.html',
  styleUrls: ['./my-graph.component.css']
})
export class MyGraphComponent implements OnInit {
  @ViewChild('myTable') myTable!: MyTableComponent;

  data: any[] = [];
  
  ngOnInit() {
    this._parseDataIntoNodes(this.data);
    this._parseDataIntoEdges(this.data);
  }

  testNodes: Node[] = [];
  testEdges: Edge[] = [];

  private _parseDataIntoNodes(schema: SchemeDescription) {
    this.testNodes = schema.map(table => {
      const node: Node = { id: table.tableName };
      node.label = table.tableName;
      node.data = table.columns.map(column => {
        const primaryKey = table.primaryKeys?.includes(column.attrName) ? 'PK' : '';

        const fKeyIndex = table.foreignKeys?.findIndex(key => column.attrName === key.currentAttr);
        const foreignKey = fKeyIndex !== undefined && fKeyIndex > -1 ? 'FK' : ''; 

        return {
          attrName: column.attrName,
          attrType: column.attrType,
          attrKey: `${primaryKey} ${foreignKey}`
        }
      });

      return node;
    });
  }

  private _parseDataIntoEdges(schema: SchemeDescription) {
    this.testEdges = [];
    schema.forEach(table => {
      table.foreignKeys?.forEach(foreignKey => {
        const edge: Edge = {
          source: table.tableName,
          target: foreignKey.targetTable
        }
        this.testEdges.push(edge);
      });
    });
  }

  public updateData(data: any[]) {
    this.data = data;
    // console.log(this.data);

    this._parseDataIntoEdges(this.data);
    this._parseDataIntoNodes(this.data);

    // console.log(this.testEdges);
    // console.log(this.testNodes);
  }

}

// Input data description
export type SchemeDescription = TableDescription[];

export interface TableDescription {
  tableName: string,
  columns: ColumnDescription[],
  primaryKeys?: string[],
  foreignKeys?: ForeignKeyDescription[]
}

export interface ColumnDescription {
  attrName: string,
  attrType: string
}

export interface ForeignKeyDescription {
  currentAttr: string,
  targetTable: string,
  targetAttr: string
}