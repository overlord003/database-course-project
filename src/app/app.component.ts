import { Component, OnInit } from '@angular/core';

import { SchemeDescription, ColumnDescription, TableDescription, ForeignKeyDescription } from '../app/my-graph/my-graph.component';

import { SqlParsingService } from './sql-parsing.service';
import { AlgorithmKosarayuService } from './algorithm-kosarayu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'test-project';
  
  inputData: any[] = [];
  outputData?: any;

  constructor(
    private sqlParsingService: SqlParsingService,
    private algorithmKosarayuService: AlgorithmKosarayuService
  ) {}

  // Loaded data from file
  changeListener($event: any) {
    this.readThis($event.target);
  }

  readThis(inputValue: any) {
    const file: File = inputValue.files[0]; 
    const fileReader: FileReader = new FileReader();

    fileReader.onloadend = e => {
      this.inputData = this.sqlParsingService.parseDataFromFile(String(fileReader.result));
      this.transform();
    }

    fileReader.readAsText(file);
  }


  // Перевод из данных после файла в формат для алгоритма Косараю
  transform() {
    console.log("Data from file after parsing =", this.inputData);

    let vertexData = {};
    this.inputData.forEach((table: TableDescription) => {
      let set = new Set(table.foreignKeys?.map(fk => fk.targetTable));
      Object.defineProperty(vertexData, table.tableName, {
        value: set,
        writable: true,
        enumerable: true,
        configurable: true
      });
    });

    console.log("Result before alg. kosarayu =", vertexData);

    let strongConnected = this.algorithmKosarayuService.algoritmKosarayu(vertexData);
    console.log("main strongConnected =", strongConnected);


    let mainResult: any[] = [];
    // ООО офигеть оно работает вот это да неужели курсач готов
    strongConnected.forEach(item => {
      let result = Array.from(item).map(i => this.inputData.find(table => table.tableName === i));
      mainResult.push(result);
    });

    console.log("Вот это точно конец всех моих страданий =", mainResult);

    this.inputData = mainResult[1];

  }

  
  ngOnInit() {
    //this.algorithmKosarayuService.algoritmKosarayu();
  }

  public getData() {
    //this.outputData = JSON.parse(this.inputData);
    //console.log(this.outputData);
  }

}