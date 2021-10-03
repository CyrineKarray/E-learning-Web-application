import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {ToastrModule} from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionComponent } from './Components/session/session.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { authInterceptorProviders } from './_helpers/auth.service';
import { ParticipantComponent } from './Components/participant/participant.component';
import { ParticipantService } from './Sevices/participant.service';
import { UsersComponent } from './Components/users/users.component';
import { CountryComponent } from './Components/country/country.component';
import { DomainComponent } from './Components/domain/domain.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RoleComponent } from './Components/role/role.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FormateurComponent } from './Components/formateur/formateur.component';
import { FormationComponent } from './Components/formation/formation.component';
import { OrganismeComponent } from './Components/organisme/organisme.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ParticipantComponent,
    UsersComponent,
    CountryComponent,
    DomainComponent,
    ProfileComponent,
    RoleComponent,
    SessionComponent,
    SidebarComponent,
    FormateurComponent,
    FormationComponent,
    OrganismeComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, ToastrModule.forRoot({
    timeOut:2500,
    progressBar:true,
    progressAnimation:'increasing',
    preventDuplicates:true,
    positionClass: 'toast-bottom-center',
  }), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [authInterceptorProviders, ParticipantService],
  bootstrap: [AppComponent],
})
export class AppModule {}
