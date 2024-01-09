import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { signUp } from 'src/app/model/signUp';
import { HttpClient } from '@angular/common/http';
import { CardsHome } from 'src/app/model/cardsHome';
import { editProfile } from 'src/app/model/editProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  httpProfileInfo = `${environment.api_url}/profileInfo/`
  httpCardsHome = `${environment.api_url}/cardsHome/`
  constructor(private httpclient: HttpClient) {}

  getProfile(id: string): Observable<signUp[]>{
    return this.httpclient.get<signUp[]>(this.httpProfileInfo+id)
  }

  updateProfile(formdata: FormData): Observable<editProfile[]>{
    return this.httpclient.put<editProfile[]>(this.httpProfileInfo, formdata)
  }

  getCardsProfile(): Observable<CardsHome[]>{
    return this.httpclient.get<CardsHome[]>(this.httpCardsHome)
  }
}
