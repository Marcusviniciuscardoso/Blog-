import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './Pages/sign-in/sign-in.component';
import { AllCompComponent } from './Component/all-comp/all-comp.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { CreateTopicComponent } from './Pages/create-topic/create-topic.component';
import { ProfileCardsComponent } from './Pages/profile-cards/profile-cards.component';
import { ProfileInfoComponent } from './Pages/profile-info/profile-info.component';
import { ProfileGuard } from './guards/profileGuard';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';


const routes: Routes = [
    {path: '', component: AllCompComponent},
    {path: 
      'signIn', 
      component: SignInComponent, 
    }, 
    {path: 'profileCards/:id', component: ProfileCardsComponent, canActivate: [ProfileGuard]},
    {path: 'profileInfo/:id', 
    component: ProfileInfoComponent, 
    canActivate: [ProfileGuard],
    children:[{path: 'profileInfo/:id/editProfile', component: EditProfileComponent, canActivate: [ProfileGuard]}]
  },
    {path: 'editProfile/:id', component: EditProfileComponent, canActivate: [ProfileGuard]},
    {path: 'createTopic', component: CreateTopicComponent, canActivate: [ProfileGuard]},
    {path: 'signUpp', component: SignUpComponent},
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }