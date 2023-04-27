import { Component } from '@angular/core';
import { User } from 'src/app/classes/user';
import { LoginuserService } from 'src/app/services/loginuser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = new User();

  constructor(private loginuserService: LoginuserService){}


  userLogin(){
    this.loginuserService.loginUser(this.user).subscribe(
      (response) => {
        console.log("Anmeldung Erfolgreich");
      },
      error => {
        console.log("Anmeldung Fehlgeschlagen");
      }
    );
  }



}
