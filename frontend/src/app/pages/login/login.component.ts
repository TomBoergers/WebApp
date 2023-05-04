import { Component } from '@angular/core';
import { User } from 'src/app/classes/user';
import { LoginuserService } from 'src/app/services/loginuser.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = new User();

  constructor(private loginuserService: LoginuserService, private router: Router){}


  userLogin(){
    this.loginuserService.loginUser(this.user).subscribe(
      (response) => {
        console.log("Anmeldung Erfolgreich");
        this.router.navigate(['/zweiFaktor']);
      },
      error => {
        console.log("Anmeldung Fehlgeschlagen");
      }
    );
  }



}
