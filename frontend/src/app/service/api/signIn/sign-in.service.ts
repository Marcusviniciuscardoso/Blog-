import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { creden } from 'src/app/model/creden';
import { environment } from 'src/environment/environment';
import { tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  httpsignIn = `${environment.api_url}/signIn`
  httpprotectedData = `${environment.api_url}/protected-data`
  
  postCreds(data: creden): Observable<creden[]> {
    const info = this.httpClient.post<creden[]>(this.httpsignIn, data).pipe(
      tap((response: any)=>{
        if (response.auth && response.token) {
          // Adicione a propriedade 'token' ao objeto 'response'
          response.token = response.token;
          response.auth = response.auth
          localStorage.setItem("token", response.token)
          localStorage.setItem("auth", response.auth)
        }
    }))
    return info
  }
  getCreds(): Observable<any> {
    const token = localStorage.getItem('token')
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  
    return this.httpClient.get<any>(this.httpprotectedData, { headers }).pipe(
      tap(response => {
        const idProfile = response.idprofile[0].idprofile; 
        this.router.navigate([`/profileInfo/${idProfile}`])
        localStorage.setItem('idProfile', idProfile)

        return response
      })
    );
  }
}
