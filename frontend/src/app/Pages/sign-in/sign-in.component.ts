import { Component, OnInit } from '@angular/core'
import { Cards } from 'src/app/model/cards'
import { CardService } from 'src/app/service/api/body/card.service'
import { creden } from 'src/app/model/creden'
import { SignInService } from 'src/app/service/api/signIn/sign-in.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    constructor(private cardService: CardService, private signInService: SignInService, private router: Router){}

    cred = {} as creden; 
    creds: creden[];

    card = {} as Cards; 
    cards: Cards[];

    username: string;
    userpassword: string;
    
    errorMessage: string = ''

    meuCard = {
      id: 0,
      image: '',
      title: '',
      subtitle: ''
    }

    ngOnInit(): void {
      this.getCreds()
    }

    /*getCards() {
      this.cardService.getCards().subscribe((cards: Cards[]) => {
        this.cards = cards;
      });
    }*/
   
    getCreds() {
       this.signInService.getCreds().subscribe((creds: creden[]) => {
        this.creds = creds;
        console.log("opaa", this.creds)
      });
    }
    
    postCreds() {
      const credsData: creden = {
        idcredentials: 0,
        username: this.username,
        userpassword: this.userpassword,
      }

      this.signInService.postCreds(credsData).subscribe(
        (response) => {
          this.creds = response
          // Limpar campos após o registro bem-sucedido
          this.username = '';
          this.userpassword = '',
          localStorage.getItem('token')
          this.getCreds()
          console.log("Olha o postcreds")
          console.log("Olha o idprofile: ", localStorage.getItem('idProfile'))
        },
        (error => {
          if (error.status === 400) {
            // Email já está em uso, exiba uma mensagem de erro
            this.errorMessage = error.error.message;
            console.log(this.errorMessage)
          } else {
            // Outro erro, lide com ele de acordo
            console.error(error);
          }
        }),
      );
    }
}
