import { Component, OnInit, Input } from '@angular/core';

export interface DataBaseElement {
  key: string;
  name: string;
  type: string;
}

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  @Input() data: DataBaseElement[] = [];

  w: number = 0;
  h: number = 0;

  displayedColumns: string[] = ['Key', 'AttrName', 'AttrType'];
  dataSource: DataBaseElement[] = [];

  ngOnInit() {
    this.dataSource = this.data;
    this.w = this.displayedColumns.length * 100;
    this.h =  this.dataSource.length * 51 + 70;
  }
}