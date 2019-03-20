import { Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { GridComponent, ToolbarItems, ToolbarService, ExcelExportService } from '@syncfusion/ej2-angular-grids';
import { data, employeeData } from './datasource';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { Customer } from './customer';
import { DataStateChangeEventArgs, Sorts, DataSourceChangedEventArgs } from '@syncfusion/ej2-grids';
import { debug } from 'util';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { Tooltip } from '@syncfusion/ej2-popups';
@Component({
    selector: 'app-root',
    template: `
    <ejs-grid #grid [dataSource]='data | async' allowPaging='true' [editSettings]='editSettings' [toolbar]='toolbar'
    (dataSourceChanged)='dataSourceChanged($event)' (dataStateChange)= 'dataStateChange($event)'>
                    <e-columns>
                    <e-column field='id' headerText='Customer ID' width='120' textAlign='Right' isPrimaryKey='true'></e-column>
                    <e-column field= "name" headerText="Customer Name" width="150"></e-column>
                    </e-columns>
                </ejs-grid>
                `,
})
export class AppComponent implements OnInit {

    public data: Observable<DataStateChangeEventArgs>;
    public pageOptions: Object;
    public editSettings: Object;
    public toolbar: string[];
    public state: DataStateChangeEventArgs;
    @ViewChild('grid')
    public grid: GridComponent;
    customers: Customer[];
    constructor(private crudService: CrudService) {
        this.data = crudService;
    }

    public dataStateChange(state: DataStateChangeEventArgs): void {
        this.crudService.execute(state);
    }

    public dataSourceChanged(state: DataSourceChangedEventArgs): void {
        if (state.action === 'add') {
            this.crudService.addRecord(state).subscribe(() => {
                state.endEdit()
            });
            this.crudService.addRecord(state).subscribe(() => { }, error => console.log(error), () => {
                state.endEdit()
            });
        } else if (state.action === 'edit') {
            this.crudService.updateRecord(state).subscribe(() => {
                state.endEdit()
            }, (e) => {
                this.grid.closeEdit();
            }
            );
        } else if (state.requestType === 'delete') {
            this.crudService.deleteRecord(state).subscribe(() => {
                state.endEdit()
            });
        }
    }

    public ngOnInit(): void {
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        const state: any = { skip: 0, take: 12 };
        this.crudService.execute(state);
    }
}


