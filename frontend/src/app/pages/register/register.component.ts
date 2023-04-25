import { Component } from '@angular/core';
import { User } from 'src/app/classes/user';
import { RegisteruserService } from 'src/app/services/registeruser.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    user: User = new User();

    constructor(private registerUserService: RegisteruserService){}

    public userRegister(){
      console.log(this.user);
      
    }
}
