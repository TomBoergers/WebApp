import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './pages/table/table.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ZweiFaktorComponent } from './pages/zwei-faktor/zwei-faktor.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { TableVornameComponent } from './pages/table/table-pages/table-vorname.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    TableComponent,
    ProfileComponent,
    ZweiFaktorComponent,
    RegisterAdminComponent,
    TableVornameComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
