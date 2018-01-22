import { SalesData } from './sales-data'; // interface
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; // for async data from APIs
import { catchError, map, tap } from 'rxjs/operators'; // try catch on observables
import { of } from 'rxjs/observable/of'; // convert some data to observables
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  results: SalesData[];

  private dataUrl = 'assets/salesData.json';  // URL to web api // in our case it is a json file.

  constructor(private http: HttpClient) { }

  getSalesData(): Observable<SalesData[]> {
    return this.http.get<SalesData[]>(this.dataUrl).pipe(
      tap(data => console.log('fetched sales data')),
      catchError(this.handleError('getSalesData', [])));
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
