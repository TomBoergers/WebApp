import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginuserService} from "./loginuser.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private loginService: LoginuserService,private roleAs: string) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("user")){
      this.roleAs = 'user';
      return true;
    }
    else if (localStorage.getItem("admin")){
      this.roleAs = 'admin';
      return true;
    }

    return this.loginService.isLoggedIn;
  }
}
