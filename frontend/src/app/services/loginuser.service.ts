import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from "@angular/router";
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseUrl = 'http://localhost:8080'
    isLoggedIn = new BehaviorSubject<boolean>(false);


  constructor(private httpClient: HttpClient, private router:Router) { }

  loginUser(user: User) {
    this.httpClient.post('http://localhost:8080/nutzer/login', user, {observe:'response'}).subscribe((result)=>{
      console.warn(result)
      if(result){
        this.isLoggedIn.next(true);
          localStorage.setItem('user', JSON.stringify(user))
        alert("Login Erfolgreich. Sie werden nun zur Zwei-Faktor Authentifizierung weitergeleitet")
        this.router.navigate(['zweiFaktor'])
      }
    });


  }
  reloadPage() {
    if(localStorage.getItem('user')){
      this.isLoggedIn.next(true)
    }
  }


}
