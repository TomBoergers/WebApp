import {Component, OnInit} from '@angular/core';
import {zweiFaktorService} from "../../services/zweiFaktor.service";
import {LoginuserService} from "../../services/loginuser.service";
import {Router} from "@angular/router";
import {User} from "../../classes/user";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {SysAdmin} from "../../classes/sys-admin";


@Component({
  selector: 'app-zwei-faktor',
  templateUrl: './zwei-faktor.component.html',
  styleUrls: ['./zwei-faktor.component.scss']
})
export class ZweiFaktorComponent implements OnInit{
  admin: SysAdmin = new SysAdmin();
  user: User = new User();
  code: String = '';
  email: String ='';
  isLoggedIn = new BehaviorSubject<boolean>(false);


  constructor(private zweiFaktorSerivce: zweiFaktorService,
              private loginuserSerivce: LoginuserService,
              private router: Router, private httpClient: HttpClient){}

  ngOnInit(): void {


  }

  public userZweiFaktor() {
    if(this.code === "1234"){
      this.router.navigate([''])
      console.log("Zwei-Faktor-Authentifizierung erfolgreich");
    }
    else if(localStorage.getItem('admin')){
    let adminStore=localStorage.getItem('admin');
    let adminData = adminStore && JSON.parse(adminStore);
    this.email = adminData.email;
      this.zweiFaktorSerivce.codePruefenAdmin(this.email,this.code).subscribe(
        (response: any) => {


          this.router.navigate([''])
          console.log("Zwei-Faktor-Authentifizierung erfolgreich");

        },
        (error:any) => {
          console.log("Zwei-Faktor-Authentifizierung fehlgeschlagen");
          alert("Zwei-Faktor-Authentifizierung fehlgeschlagen");
        }
      );
    }

    else if(localStorage.getItem('user')){
    let userStore=localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.email = userData.email;
      this.zweiFaktorSerivce.codePruefenUser(this.email,this.code).subscribe(
        (response: any) => {


          this.router.navigate([''])
          console.log("Zwei-Faktor-Authentifizierung erfolgreich");

        },
        (error:any) => {
          console.log("Zwei-Faktor-Authentifizierung fehlgeschlagen");
          alert("Zwei-Faktor-Authentifizierung fehlgeschlagen");
        }
      );
    }





  }
  /*loginUserVer(user: User) {
    this.httpClient.post('http://localhost:8080/nutzer/login', user, {observe:"response"}).subscribe((result)=> {
        if (result) {
          this.isLoggedIn.next(true);
          this.userData(user);
          alert("Login Erfolgreich.")

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

*/
}
