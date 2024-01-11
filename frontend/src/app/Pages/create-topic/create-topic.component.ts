import { Component } from '@angular/core'
import { CreateTopicService } from 'src/app/service/api/createTopic/create-topic.service'
import { CardLandingPage } from 'src/app/model/cardLandingPage'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent {

  constructor(private createtopicservice: CreateTopicService, private router: Router){}

  card = {} as CardLandingPage
  cards: CardLandingPage[]

  formdata = {
    idcard: 0,
    title: '',
    subtitle: '',
    text: '',
    creationdate: '',
    profileid: 0,
    featuredimage: null as File | null 
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100
  
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

   values: string[] = []

   imageSrc: string = ''
   imgCount: number = 1
   imgIndex: number[] = []

   urls: Array<{ id: number, image: string }> = [];


   readURL(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.formdata.featuredimage = file;

      // Pré-visualização da imagem selecionada
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Define a URL da imagem para exibição
      };
      reader.readAsDataURL(file);
    }
  }

  getHome(){
    this.router.navigate(['/'])
  }
  
   escolherImg() {
     document.getElementById('fileInput')?.click()
   }

   addText(){
      this.values.push('0')
   }

   addImg(){
     this.values.push('1')
     this.imgCount = this.imgCount + 1
     this.imgIndex.push(this.imgCount)
    } 

    auto_grow(event: Event): void {
      const element = event.target as HTMLTextAreaElement;
      if (element instanceof HTMLTextAreaElement) {
        element.style.height = '5px';
        element.style.height = (element.scrollHeight) + 'px';
      }
    }

    postCard(){
      const formData = new FormData();
      this.formdata.profileid = Number(localStorage.getItem('idProfile'))
      this.formdata.creationdate = this.formatDate(new Date())
      formData.append('idcard', this.formdata.idcard.toString())
      formData.append('title', this.formdata.title || '')
      formData.append('subtitle', this.formdata.subtitle || '')
      formData.append('text', this.formdata.text || '')
      formData.append('creationdate', this.formdata.creationdate.toString())
      formData.append('profileid', this.formdata.profileid.toString())
      if (this.formdata.featuredimage) {
        formData.append('featuredimage', this.formdata.featuredimage);
      }
      
      this.createtopicservice.postCard(formData).subscribe((cards: CardLandingPage[]) => {
        this.cards = cards;
      });
      localStorage.setItem("reloadHome", "1")
      this.router.navigate(['/'])
    }
}
