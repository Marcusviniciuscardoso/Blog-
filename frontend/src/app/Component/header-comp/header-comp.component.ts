import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileInfoService } from 'src/app/service/api/profileInfo/profile-info.service';
import { signUp } from 'src/app/model/signUp';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-comp',
  templateUrl: './header-comp.component.html',
  styleUrls: ['./header-comp.component.css']
})
export class HeaderCompComponent {
  constructor(private router: Router, private profileinfoservice: ProfileInfoService, private location: Location){}

  profile = {} as signUp
  profiles: signUp[]

  ngOnInit(){
    this.getProfile()
  }

  anularToken(){
    localStorage.clear()
    this.location.go(this.location.path())
    window.location.reload()
  }

  profileInfo(){
    this.router.navigate([`/profileInfo/${localStorage.getItem('idProfile')}`])
  }

  getProfile(){
    this.profileinfoservice.getProfile(String(localStorage.getItem('idProfile'))).subscribe((perfils: signUp[]) =>{
      if (perfils.length > 0) {
        this.profile = perfils[0];
        console.log("perfil: ", this.profile.avatar);
      }
    });
  }
}
