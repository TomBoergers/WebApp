import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './pages/table/table.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ZweiFaktorComponent } from './pages/zwei-faktor/zwei-faktor.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { TablePagesComponent } from './pages/table/table-pages/table-pages.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin/login-admin.component';
import { FriendlistComponent } from './pages/friendlist/friendlist.component';
import { NewfriendRequestsComponent } from './pages/friendlist/newfriend-requests/newfriend-requests.component';
import { FriendAddComponent } from './pages/friendlist/friend-add/friend-add.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GeoDataComponent } from './pages/geo-data/geo-data.component';
import {DiagramComponent} from "./pages/diagram/diagram.component";




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
    TablePagesComponent,
    LoginAdminComponent,
    FriendlistComponent,
    NewfriendRequestsComponent,
    FriendAddComponent,
    ChatComponent,
    GeoDataComponent,
    ChatComponent,
    DiagramComponent


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        CanvasJSAngularChartsModule,
        ReactiveFormsModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
