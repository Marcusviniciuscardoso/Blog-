import { Component, OnInit } from '@angular/core';
import { Cards } from 'src/app/model/cards';
import { CardsHome } from 'src/app/model/cardsHome';
import { CardService } from 'src/app/service/api/body/card.service';
import { CardLandingPage } from 'src/app/model/cardLandingPage';

@Component({
  selector: 'app-body-comp',
  templateUrl: './body-comp.component.html',
  styleUrls: ['./body-comp.component.css']
})
export class BodyCompComponent implements OnInit {
   searchInput: string = ''

   
   url = 'http://localhost:3000/cards'; // api rest fake
   
   card = {} as Cards 
   cardHome = {} as CardsHome
   cards: CardLandingPage[]
   cardss: CardLandingPage[]
   cardsss: CardsHome[]
   
   handleChange(event: any){
     this.searchInput = event.target.value
     console.log("evento", this.searchInput)
     console.log("filtro", this.getFilteredCards())
   }

   
   meuCard = {
      id: 0,
      featuredimage: '',
      title: '',
      subtitle: '',
      creationdate: '',
    }
    
    constructor(private cardService: CardService){}
    
    ngOnInit() {
      this.getCards();
      const reload = localStorage.getItem("reloadHome")
      if(reload === "1"){
        localStorage.setItem("reloadHome", "2")
        window.location.reload()
      }
    }
    
    getCards() {
      this.cardService.getCards().subscribe((cards: CardLandingPage[]) => {
        this.cards = cards
        this.cardss = cards
      });
      console.log("Ó os cards: ", this.cards)
    }

    /*novoCard() {
      console.log('Novo card a ser enviado:', this.card);
      this.cardService.saveCard(this.meuCard)
      this.card = {} as Cards
    }*/
    
    
    getFilteredCards(): CardLandingPage[] {
      const regex = new RegExp(this.searchInput, 'i'); // 'i' torna a busca insensível a maiúsculas/minúsculas
      return this.cardss.filter(card =>
        regex.test(card.title) || regex.test(card.subtitle),
      )
    }

  }
  