import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-mem';
import { CrudService } from './crud.service';
import { GridAllModule, GridComponent, ToolbarService, ExcelExportService, SortService  } from '@syncfusion/ej2-angular-grids';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GridAllModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
      )
  ],
  providers: [ToolbarService, ExcelExportService, SortService, CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
