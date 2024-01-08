import { Component } from '@angular/core';
import { CardService } from 'src/app/service/api/body/card.service';
import { CommentService } from 'src/app/service/api/comment/comment.service';
import { comments } from 'src/app/model/comment';
import { Cards } from 'src/app/model/cards';
import { CardsHome } from 'src/app/model/cardsHome';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProfileInfoService } from 'src/app/service/api/profileInfo/profile-info.service';
import { signUp } from 'src/app/model/signUp';

@Component({
  selector: 'app-profile-cards',
  templateUrl: './profile-cards.component.html',
  styleUrls: ['./profile-cards.component.css']
})
export class ProfileCardsComponent {

  card = {} as Cards; 
  card2 = {} as CardsHome
  comment = {} as comments
  comments: comments[]
  commentslength: number
  cards: CardsHome[]
  localId: number
  alreadyLike: boolean = false
  alreadyDislike: boolean = false
  profile = {} as signUp
  profiles: signUp[]
  idprofile: number | null = Number(localStorage.getItem('idProfile'))

  formdata = {
    idcomment: 0,
    comment: '',
    commentdate: '',
    likes: 0,
    dislikes: 0,
    profileid: 0,
    cardid: 0
  }

  myCard = {
    id: 0,
    imagecard: '',
    title: '',
    subtitle: '',
    creationdate: ''
  }
   
  private routeSub: Subscription
  constructor(private cardService: CardService, private route: ActivatedRoute, private commentservice: CommentService, private profileinfoservice: ProfileInfoService){}

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100
  
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  ngOnInit() {
    this.getCards();
    this.routeSub = this.route.params.subscribe(params =>{
       this.localId = Number(params["id"])
    })
    this.getComment()
    this.getProfile()
    console.log("rota id: ", this.localId)
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe()
  }

  getCards() {
      this.profileinfoservice.getCardsProfile().subscribe((cards: CardsHome[]) => {
      this.cards = cards
      console.log("aquiiiii",this.cards)
    })
  }

  getComment(){
      this.commentservice.getComment(String(this.localId)).subscribe((comments: comments[])=>{
      this.comments = comments
      console.log("comentários: ", this.comments)
      this.commentslength = this.comments.length
    })
  }

  getProfile(){
    this.commentservice.getProfileComment().subscribe((perfils: signUp[]) =>{
      this.profiles = perfils
      console.log("Olha os profiles: ", perfils)
    })}

  postComment(){
      const formData = new FormData();
      this.formdata.profileid = Number(localStorage.getItem('idProfile'))
      this.formdata.cardid = this.localId
      this.formdata.commentdate = this.formatDate(new Date())
      formData.append('idcomment', this.formdata.idcomment.toString())
      formData.append('comment', this.formdata.comment)
      formData.append('likes', this.formdata.likes.toString())
      formData.append('dislikes', this.formdata.dislikes.toString())
      formData.append('profileid', this.formdata.profileid.toString())
      formData.append('cardid', this.formdata.cardid.toString())
      formData.append('commentdate', this.formdata.commentdate.toString())
      
      formData.forEach((value: BlobPart, key: string) => {
        console.log("aquiiii: ", key, value);
      });
      console.log("Chegou aqui");
      this.commentservice.postComment(formData).subscribe((cards: comments[]) => {
        this.comments = cards;
      })
  }

  postLike(comentario: comments){
    if(this.alreadyLike){
      this.alreadyLike = false
      comentario.likes--
      this.commentservice.putComment(comentario).subscribe(response => {
        console.log(response);
      })
    }
    else if(this.alreadyDislike){
      comentario.dislikes--
      comentario.likes++
      this.alreadyLike = true
      this.alreadyDislike = false
      this.commentservice.putComment(comentario).subscribe(response => {
        console.log(response);
      })
    }
    else{
      comentario.likes++
      this.alreadyLike = true   
      this.commentservice.putComment(comentario).subscribe(response => {
        console.log(response);
      })
    }
  }

  postDislike(comentario: comments){
    if(this.alreadyDislike){
      this.alreadyDislike = false
      comentario.dislikes--
      this.commentservice.putComment(comentario).subscribe(response => {
        console.log(response);
      })
    }
    else if(this.alreadyLike){
       comentario.likes--
       comentario.dislikes++
       this.alreadyLike = false
       this.alreadyDislike = true
       this.commentservice.putComment(comentario).subscribe(response => {
        console.log(response);
      })
    }
    else{
      comentario.dislikes++
      this.alreadyDislike = true
      this.commentservice.putComment(comentario).subscribe(response => {
        console.log(response);
      })
    }
  }
   
  /*novoCard() {
    // Enviar o novo card para o servidor ou fazer outras ações aqui
    console.log('Novo card a ser enviado:', this.card);
    this.cardService.saveCard(this.meuCard)
    // Limpar o objeto card após enviar o formulário
    this.card = {} as Cards;
  }*/
}
