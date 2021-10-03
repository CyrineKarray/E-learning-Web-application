import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionComponent } from './Components/session/session.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ParticipantComponent } from './Components/participant/participant.component';
import { UsersComponent } from './Components/users/users.component';
import { CountryComponent } from './Components/country/country.component';
import { DomainComponent } from './Components/domain/domain.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RoleComponent } from './Components/role/role.component';
import { FormationComponent } from './Components/formation/formation.component';
import { FormateurComponent } from './Components/formateur/formateur.component';
import { OrganismeComponent } from './Components/organisme/organisme.service';

const routes: Routes = [
  { path: 'sessions', component: SessionComponent },
  { path: '', redirectTo: 'sessions', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'participant', component: ParticipantComponent },
  { path: 'user', component: UsersComponent },
  { path: 'country', component: CountryComponent },
  { path: 'domain', component: DomainComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'role', component: RoleComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'formateur', component: FormateurComponent },
  { path: 'organisme', component: OrganismeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
