import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Customer } from './customer';
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-grids';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CrudService extends Subject<DataStateChangeEventArgs>  {

  private customersUrl = 'api/customers';  // URL to web api

  constructor(
    private http: HttpClient) {
    super();
  }

  public execute(state: any): void {
      this.getAllData(state).subscribe(x => super.next(x as DataStateChangeEventArgs));
  }

  /** GET all data from the server */
  getAllData( state ?: any): Observable<any[]> {
    return this.http.get<Customer[]>(this.customersUrl)
      .map((response: any) => (<any>{
        result: state.take > 0 ? response.slice(0, state.take) : response,
        count: response.length
      }))
      .map((data: any) => data);
  }

  /** POST: add a new record  to the server */
  addRecord(state: DataSourceChangedEventArgs): Observable<Customer> {
    // you can apply empty string instead of state.data to get failure(error)
    return this.http.post<Customer>(this.customersUrl, state.data, httpOptions);
  }

  /** DELETE: delete the record from the server */
  deleteRecord(state: any): Observable<Customer> {
    const id = state.data[0].id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, httpOptions);
  }

  /** PUT: update the record on the server */
  updateRecord(state: DataSourceChangedEventArgs): Observable<any> {
    return this.http.put(this.customersUrl, state.data, httpOptions);
  }

}

