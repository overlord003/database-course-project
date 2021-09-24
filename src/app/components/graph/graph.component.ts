import { Component, OnInit, Input } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import { SchemeDescription } from '../../model/table.model';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() data: SchemeDescription = [];

  public nodes: Node[] = [];
  public edges: Edge[] = [];
  
  ngOnInit() {
    this._createNodes(this.data);
    this._createEdges(this.data);
  }

  private _createNodes(scheme: SchemeDescription) {
    this.nodes = scheme.map(table => {
      const node: Node = { id: table.tableName };
      node.label = table.tableName;
      node.data = table.columns.map(column => {
        const primaryKey = table.primaryKeys?.includes(column.attrName) ? 'PK' : '';
        const foreignKeyIndex = table.foreignKeys?.findIndex(key => column.attrName === key.currentAttr);
        const foreignKey = foreignKeyIndex !== undefined && foreignKeyIndex > -1 ? 'FK' : ''; 

        return {
          attrName: column.attrName,
          attrType: column.attrType,
          attrKey: `${primaryKey} ${foreignKey}`
        }
      });

      return node;
    });
  }

  private _createEdges(scheme: SchemeDescription) {
    this.edges = [];
    scheme.forEach(table => {
      table.foreignKeys?.forEach(foreignKey => {
        const edge: Edge = {
          source: table.tableName,
          target: foreignKey.targetTable
        }
        this.edges.push(edge);
      });
    });
  }
}