import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/classes/user';
import {HttpClient} from "@angular/common/http";
import {LoginuserService} from "../../services/loginuser.service";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  email: string = '';
  dateOfBirth: string = '';
  userName: string = '';

  foundUser : User = new User();

  constructor(private httpClient: HttpClient, private loginuserService: LoginuserService){
  }


  ngOnInit() {
    if(localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.userName = userData.email;
      this.user = this.loginuserService.user







    }



    }


  editEmail(): void {
    const newEmail = prompt('Deine Email:');
    if (newEmail) {
      this.email = newEmail;
    }
  }

  editDateOfBirth(): void {
    const newDateOfBirth = prompt('Dein Geburtsdatum');
    if (newDateOfBirth) {
      this.dateOfBirth = newDateOfBirth;
    }
  }

  url: string|null|ArrayBuffer  ="assets/profile/WhatsApp-Profilbild-mit-Fliege.png"
  onFileSelected(files: FileList | null) {
    if (files) {
      var reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (event:Event) => {
        let fileReader = event.target as FileReader
        this.url = fileReader.result;
      }
    }
  }

  protected readonly onselect = onselect;
  user: any;

}
