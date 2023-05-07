import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from "@angular/router";
import { User } from '../classes/user';
import {SysAdmin} from "../classes/sys-admin";


@Injectable({
  providedIn: 'root'
})
export class LoginadminService {
  private baseUrl = 'http://localhost:8080'
  isLoggedIn = new BehaviorSubject<boolean>(false);

  user: User = new User();
  admin: SysAdmin = new SysAdmin();



  constructor(private httpClient: HttpClient, private router:Router) { }

  loginAdmin(user: User) {


    this.httpClient.post('http://localhost:8080/SysAdmin/login', user, {observe:"response"}).subscribe((result)=> {
        if (result) {
          this.isLoggedIn.next(true);
          this.adminData(user);
          alert("Login Erfolgreich. Sie werden nun zur Zwei-Faktor Authentifizierung weitergeleitet")
          this.router.navigate(['zweiFaktor'])
        }
      },
      error => { alert("Anmeldung fehlgeschlagen")}

    );

  }

  adminData(admin: SysAdmin){
    this.httpClient.post('http://localhost:8080/SysAdmin/findAdmin', admin).subscribe((result)=>{
      localStorage.setItem('admin', JSON.stringify(result))
    });
  }

  reloadPage() {
    if(localStorage.getItem('admin')){
      this.isLoggedIn.next(true)
    }
  }



}

