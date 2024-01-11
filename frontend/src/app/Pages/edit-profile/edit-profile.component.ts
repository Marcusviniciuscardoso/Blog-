import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileInfoService } from 'src/app/service/api/profileInfo/profile-info.service';
import { signUp } from 'src/app/model/signUp';
import { editProfile } from 'src/app/model/editProfile';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  profile = {} as signUp
  profiles: signUp[]
  editProfile = {} as editProfile
  editProfiles: editProfile[]
  localId: number;
  private routeSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private profileinfoservice: ProfileInfoService) {}

  ngOnInit() { 
    this.routeSub = this.route.params.subscribe(params => {
      this.localId = Number(params["id"]);
    });
    this.getProfile()
   
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  formdata = {
    idprofile: 0,
    name: '',
    surname: '',
    dateofbirth: '',
    //password: '',
    avatar: null as File | null,
  };

  previewImage: string | ArrayBuffer | File | null 

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

  getBack() {
    this.router.navigate(['/profileInfo/', this.localId]);
  }

  getProfile() {
    this.profileinfoservice.getProfile(String(this.localId)).subscribe((profiles: signUp[]) => {
      if (profiles.length > 0) {
        this.profile = profiles[0];
        this.previewImage = `http://localhost:3333/static/images/uploads/${this.profile.avatar}`
      }
    });
  }

  updateProfile(){
    const formData = new FormData();
    this.formdata.idprofile = Number(this.localId)
    formData.append('idprofile', this.formdata.idprofile.toString());
    formData.append('name', this.formdata.name || '');
    formData.append('surname', this.formdata.surname || '');
    formData.append('dateofbirth', this.formdata.dateofbirth || '');
    //formData.append('password', this.formdata.password || '');
    if (this.formdata.avatar) {
      formData.append('avatar', this.formdata.avatar || null);
    }

    this.profileinfoservice.updateProfile(formData).subscribe((editprofile: editProfile[]) => {
      this.editProfiles = editprofile;
    });
    localStorage.setItem("reloadProfileInfo", "1")
    this.router.navigate([`/profileInfo/${this.localId}`])
  }
}
