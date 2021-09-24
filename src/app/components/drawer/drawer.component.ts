import { Component } from '@angular/core';
import { SchemeDescription, TableDescription } from '../../model/table.model'; 
import { SqlParsingService } from '../../servises/sql-parsing-servise/sql-parsing.service';
import { AlgorithmKosarayuService } from '../../servises/algorithm-kosarayu-service/algorithm-kosarayu.service'; 


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent  {
  public tabs: any[] = [];

  constructor(
    private sqlService: SqlParsingService,
    private mathService: AlgorithmKosarayuService
  ) {}

  public changeListener($event: any) {
    this._readData($event.target);
  }

  private _readData(fileData: any) {
    const file: File = fileData.files[0]; 
    const fileReader: FileReader = new FileReader();

    fileReader.onloadend = e => {
      this.tabs = this._transformDatabase(
        this.sqlService
          .parseDataFromFile(
            String(fileReader.result)
          )
      );
    };

    fileReader.readAsText(file);
  }

  private _findNeighboringVertices(database: SchemeDescription) {
    const vertex = {};
    database.forEach((table: TableDescription) => {
      const set = new Set(table.foreignKeys?.map(fk => fk.targetTable));
      Object.defineProperty(vertex, table.tableName, {
        value: set,
        writable: true,
        enumerable: true,
        configurable: true
      });
    });

    return vertex;
  }

  private _createTabs(databaseFull: SchemeDescription, databaseItems: any[]) {
    const tabs: any[] = [];
    tabs.push({title: "All", content: databaseFull});    
    tabs.push(
      ...databaseItems.map((item, index) => {
        return { title: index, content: item }
      })
    );

    return tabs;
  }

  private _transformDatabase(database: SchemeDescription) {
    return (
      this._createTabs(
        database,
        this.mathService
          .algoritmKosarayu(this._findNeighboringVertices(database))
          .map(verticesSet => 
            Array
              .from(verticesSet)
              .map(vertex => database.find(table =>
                table.tableName === vertex
              ))
          )
      )
    );
  }
}