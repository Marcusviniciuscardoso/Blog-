import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { signUp } from 'src/app/model/signUp';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private httpclient: HttpClient) {}
  httpSignUp = `${environment.api_url}/signUp`;

  generateBoundary() {
    const timestamp = new Date().getTime().toString(16);
    const randomString = Math.random().toString(16).substring(2);
    return `----Boundary_${timestamp}_${randomString}`;
  }

  postProfile(formData: FormData): Observable<signUp[]> {
    console.log('Informações do formdata: ', formData);

    return this.httpclient.post<signUp[]>(this.httpSignUp, formData).pipe(
      catchError(this.handleError)
    );
  }

  getProfile(): Observable<signUp[]> {
    return this.httpclient.get<signUp[]>(this.httpSignUp).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Errorr: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
