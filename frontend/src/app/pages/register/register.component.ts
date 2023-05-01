import { Component } from '@angular/core';
import { User } from 'src/app/classes/user';
import { RegisteruserService } from 'src/app/services/registeruser.service';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    user: User = new User();

    constructor(private registerUserService: RegisteruserService){}


    public userRegister(){
      this.registerUserService.registerUser(this.user).subscribe(
        response => {
          console.log("Registrierung erfolgreich")
        },
        error => {
          console.log("Registrierung fehlgeschalgen")
        }
      );
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
}
