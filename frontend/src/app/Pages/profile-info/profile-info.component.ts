import { Component } from '@angular/core'
import { Cards } from 'src/app/model/cards'
import { CardService } from 'src/app/service/api/body/card.service'
import { CardsHome } from 'src/app/model/cardsHome'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { signUp } from 'src/app/model/signUp'
import {ProfileInfoService} from 'src/app/service/api/profileInfo/profile-info.service'

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})

export class ProfileInfoComponent {

  private routeSub: Subscription
  constructor (private cardService: CardService, private router: Router, private route: ActivatedRoute, private profileinfoservice: ProfileInfoService) {}

  infoStatus: boolean = false
  localId: number
  cardStatus: number = 0

  cardStatusFunction(){
    this.cardStatus = 1
  }

  alterarInfo () {
    this.infoStatus = true
  }

  editProfile () {
    this.router.navigate(['/editProfile/', this.localId])
  }

  card = {} as Cards
  card2 = {} as CardsHome
  cards: CardsHome[]
  cardss: CardsHome[]
  profile = {} as signUp
  profiles: signUp[]

  ngOnInit (): void {
    this.getCards()
    this.routeSub = this.route.params.subscribe(params =>{
      this.localId = Number(params["id"])
    })
    this.getProfile()
    const reload = localStorage.getItem('reloadProfileInfo')
    if(reload === '1'){
      localStorage.setItem("reloadProfileInfo", "2")
      window.location.reload()
    }
  }

  getCards() {
    this.profileinfoservice.getCardsProfile().subscribe((cards: CardsHome[]) => {
      this.cards = cards
      this.cardss = cards
    })
  }

  getProfile(){
    this.profileinfoservice.getProfile(String(this.localId)).subscribe((profiles: signUp[]) =>{
      this.profiles = profiles
    })
  }

  getHome(){
    localStorage.setItem("reloadHome", "1")
    this.router.navigate([`/`])
  }
}
