import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { comments } from 'src/app/model/comment';
import { signUp } from 'src/app/model/signUp';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  httpsignIn = `${environment.api_url}/profileCardsComment/`
  httpProfileComment = `${environment.api_url}/profileInfoComment/`
  constructor(private httpclient: HttpClient) { }

  getComment(id: string):Observable<comments[]> {
    return this.httpclient.get<comments[]>(this.httpsignIn+id)
  }

  getProfileComment(): Observable<signUp[]>{
    return this.httpclient.get<signUp[]>(this.httpProfileComment)
  }

  postComment(formdata: FormData): Observable<comments[]>{
    return this.httpclient.post<comments[]>(this.httpsignIn, formdata)
  }

  putComment(data: comments):Observable<comments[]>{
    return this.httpclient.put<comments[]>(this.httpsignIn, data)
  }
}
