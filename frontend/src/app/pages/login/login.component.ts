import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { LoginuserService } from 'src/app/services/loginuser.service';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {signUp} from "../../../data-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  user: User = new User();



  constructor(private loginuserService: LoginuserService, private router: Router){}
ngOnInit() {
    this.loginuserService.reloadPage()
}

  userLogin(data: User){
    console.warn(data);
    this.loginuserService.loginUser(data)



  }









}
