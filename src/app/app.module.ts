import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MatTableModule } from '@angular/material/table';
import { MyTableComponent } from './my-table/my-table.component';
import { MyGraphComponent } from './my-graph/my-graph.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    MyTableComponent,
    MyGraphComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxGraphModule,
    MatTableModule,
    MatSidenavModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
