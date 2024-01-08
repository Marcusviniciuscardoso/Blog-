import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import {ProfileGuard} from './guards/profileGuard'
import {signInAuth} from './guards/signInAuth'
import { AppComponent } from './app.component';
import { HeaderCompComponent } from './Component/header-comp/header-comp.component';
import { FooterCompComponent } from './Component/footer-comp/footer-comp.component';
import { BodyCompComponent } from './Component/body-comp/body-comp.component';
import { SignInComponent } from './Pages/sign-in/sign-in.component';
import { AllCompComponent } from './Component/all-comp/all-comp.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { CreateTopicComponent } from './Pages/create-topic/create-topic.component';
import { ProfileCardsComponent } from './Pages/profile-cards/profile-cards.component';
import { ProfileInfoComponent } from './Pages/profile-info/profile-info.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderCompComponent,
    FooterCompComponent,
    BodyCompComponent,
    SignInComponent,
    AllCompComponent,
    SignUpComponent,
    CreateTopicComponent,
    ProfileCardsComponent,
    ProfileInfoComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ProfileGuard, signInAuth],
  bootstrap: [AppComponent]
})
export class AppModule {}
