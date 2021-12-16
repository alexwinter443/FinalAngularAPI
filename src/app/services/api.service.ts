import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'http://localhost:3000/products/';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
    
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Create a new item
  createItem(item:any): Observable<Product> {
    return this.http
      .post<Product>(this.base_path + 'postProduct/' + item.name + '/'+ item.description , this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

   // Delete item by id
   deleteItem(item:any) {
    return this.http
      .delete(this.base_path + 'product/' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

   // Get students data
   getList() {
    return this.http
      .get(this.base_path + 'products' )
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single student data by ID
  getItem(id:any): Observable<Product> {
    return this.http
      .get<Product>(this.base_path + 'product/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(id:any, item:any): Observable<Product> {
    return this.http
      .put<Product>(this.base_path + '/product/' + id + '/' + item.name + '/' + item.description, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}