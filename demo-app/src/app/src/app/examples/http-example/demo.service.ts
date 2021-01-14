import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${API_ENDPOINT}/users`).pipe(
      retry(3),
      catchError(handleError)
    )
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${API_ENDPOINT}/users/${id}`).pipe(
      retry(3),
      catchError(handleError)
    )
  }

  updateUser(id: number, body: any): Observable<any> {
    return this.httpClient.put(`${API_ENDPOINT}/users/${id}`, body).pipe(
      catchError(handleError)
    )
  }

  addUser(body: any): Observable<any> {
    return this.httpClient.put(`${API_ENDPOINT}/users`, body).pipe(
      catchError(handleError)
    )
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${API_ENDPOINT}/users/${id}`).pipe(
      retry(3),
      catchError(handleError)
    )
  }
}


const handleError = (error: HttpErrorResponse) => {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}
