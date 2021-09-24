import { Component, OnInit, Input } from '@angular/core';
import { DataBaseElement } from '../../model/database-element.model';
import {
  TABLE_WIDTH_VARIABLE,
  TABLE_HEIGHT_VARIABLE_1,
  TABLE_HEIGHT_VARIABLE_2
} from './table.component.constants';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: DataBaseElement[] = [];

  public width: number = 0;
  public height: number = 0;
  public displayedColumns: string[] = ['Key', 'AttrName', 'AttrType'];
  public dataSource: DataBaseElement[] = [];

  ngOnInit() {
    this.dataSource = this.data;
    this.width = this.displayedColumns.length * TABLE_WIDTH_VARIABLE;
    this.height =  this.dataSource.length * TABLE_HEIGHT_VARIABLE_1 + TABLE_HEIGHT_VARIABLE_2;
  }
}