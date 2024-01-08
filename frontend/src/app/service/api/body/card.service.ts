import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cards } from '../../../model/cards';
import { creden } from '../../../model/creden';
import { environment } from 'src/environment/environment';
import { CardLandingPage } from 'src/app/model/cardLandingPage';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  url = 'http://localhost:3333/tasks';
  url2 = 'http://localhost:3333/'

  constructor(private httpClient: HttpClient) { }

  httpCardLandingPage = `${environment.api_url}/cardLandingPage`
  
 getCreds
 ():Observable<creden[]> {
    return this.httpClient.get<creden[]>(this.url)
  }
 
  getCards():Observable<CardLandingPage[]> {
    console.log("procurando")
    return this.httpClient.get<CardLandingPage[]>(this.httpCardLandingPage)
  }

  saveCard(card: Cards){
    return this.httpClient.post<Cards>(this.url, card).subscribe(
      (response) => {
        console.log('Requisição POST bem-sucedida:', response);
      },
    )
  }
    
}
