import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from "@angular/router";
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {

  isLoggedIn = new BehaviorSubject<boolean>(false);
  user: User = new User();

  constructor(private httpClient: HttpClient, private router:Router) {
  }

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
        this.user = user;
      });
  }

  reloadPage() {
    if(localStorage.getItem('user')){
      this.isLoggedIn.next(true)
    }
  }

  getAllUsers() {
    return this.httpClient.get('http://localhost:8080/nutzer/all');
  }
}
