import { Component } from '@angular/core'
import { SignUpService } from 'src/app/service/api/signUp/sign-up.service'
import { signUp } from 'src/app/model/signUp'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  profile = {} as signUp
  profiles: signUp[]
  
  formdata = {
    idprofile: 0,
    avatar: null as File | null,
    name: '',
    surname: '',
    dateofbirth: '',
    email: '',
    password: '',
    credentialid: 0
  };

  constructor(private signUpService: SignUpService, private router: Router) {}
  
  previewImage: string | ArrayBuffer | null = 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg';
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formdata.avatar = file
      this.previewImage = null

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImage = reader.result as string | ArrayBuffer | null;
      };
    }
  }


  postSignUp () {
    const formData = new FormData();
    formData.append('idprofile', this.formdata.idprofile.toString());
    formData.append('name', this.formdata.name || '');
    formData.append('surname', this.formdata.surname || '');
    formData.append('dateofbirth', this.formdata.dateofbirth || '');
    formData.append('email', this.formdata.email || '');
    formData.append('password', this.formdata.password || '');
    formData.append('credentialid', '0');
    if (this.formdata.avatar) {
      formData.append('avatar', this.formdata.avatar);
    }
    
    this.signUpService.postProfile(formData).subscribe((profile: signUp[]) => {
      this.profiles = profile;
    });
    localStorage.setItem("reloadHome", "1")
    this.router.navigate(["/"])
  }
  

}
