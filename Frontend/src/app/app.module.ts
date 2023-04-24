import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TabellenuebersichtComponent } from './pages/tabellenuebersicht/tabellenuebersicht.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrierungComponent } from './pages/registrierung/registrierung.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { ZweiFaktorComponent } from './pages/zwei-faktor/zwei-faktor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TabellenuebersichtComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    RegistrierungComponent,
    AdminComponent,
    UserComponent,
    ZweiFaktorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
