import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { TabellenuebersichtComponent } from './pages/tabellenuebersicht/tabellenuebersicht.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrierungComponent } from './pages/registrierung/registrierung.component';
import { ZweiFaktorComponent } from './pages/zwei-faktor/zwei-faktor.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tabelle', component: TabellenuebersichtComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'registrierung', component: RegistrierungComponent },
  {path: 'zwei-faktor', component: ZweiFaktorComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
