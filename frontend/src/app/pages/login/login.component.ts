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
  
  constructor(private userService: LoginuserService){}
  
  userLogin(){
    console.log(this.user)
    
    
    
  }



}
