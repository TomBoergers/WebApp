import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TableComponent } from './pages/table/table.component';
import {ZweiFaktorComponent} from "./pages/zwei-faktor/zwei-faktor.component";
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'table', component: TableComponent},
    {path: 'zweiFaktor', component: ZweiFaktorComponent},
    {path: 'registerAdmin', component:RegisterAdminComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
