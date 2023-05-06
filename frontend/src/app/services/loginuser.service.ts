import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from "@angular/router";
import { User } from '../classes/user';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseUrl = 'http://localhost:8080'
  isLoggedIn = new BehaviorSubject<boolean>(false);

  user: User = new User();



  constructor(private httpClient: HttpClient, private router:Router) { }

  loginUser(user: User) {
        this.httpClient.post('http://localhost:8080/nutzer/login', user, {observe:"response"}).subscribe((result)=> {

            if (result) {
              this.isLoggedIn.next(true);
              this.userData(user);
              alert("Login Erfolgreich. Sie werden nun zur Zwei-Faktor Authentifizierung weitergeleitet")
              this.router.navigate(['zweiFaktor'])
            }
          },
            error => { alert("Anmeldung fehlgeschlagen")}

        );

  }

  userData(user:User){
      this.httpClient.post('http://localhost:8080/nutzer/findUser', user).subscribe((result)=>{
        localStorage.setItem('user', JSON.stringify(result))
      });
    }




  reloadPage() {
    if(localStorage.getItem('user')){
      this.isLoggedIn.next(true)
    }
  }


}
