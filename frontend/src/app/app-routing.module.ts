import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TableComponent } from './pages/table/table.component';
import {ZweiFaktorComponent} from "./pages/zwei-faktor/zwei-faktor.component";
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { TablePagesComponent } from './pages/table/table-pages/table-pages.component';
import {LoginAdminComponent} from "./pages/login-admin/login-admin/login-admin.component";
import {AuthGuard} from "./services/auth.guard";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login-admin', component:LoginAdminComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    {path: 'zweiFaktor', component: ZweiFaktorComponent},
    {path: 'registerAdmin', component:RegisterAdminComponent},
    {path: 'table', component: TableComponent, canActivate: [AuthGuard]},
    {path: 'table/:id', component: TablePagesComponent, canActivate: [AuthGuard]}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
