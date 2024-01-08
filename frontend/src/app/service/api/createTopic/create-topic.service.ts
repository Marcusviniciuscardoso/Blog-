import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environment/environment'
import { CardLandingPage } from 'src/app/model/cardLandingPage'

@Injectable({
  providedIn: 'root'
})
export class CreateTopicService {

  constructor(private httpclient: HttpClient) {}
  httpcreateTopic = `${environment.api_url}/createTopic`

  postCard(formdata: FormData): Observable<CardLandingPage[]>{
    return this.httpclient.post<CardLandingPage[]>(this.httpcreateTopic, formdata)
  }
}
