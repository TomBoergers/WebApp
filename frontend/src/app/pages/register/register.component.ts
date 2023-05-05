import { Component } from '@angular/core';
import { User } from 'src/app/classes/user';
import { RegisteruserService } from 'src/app/services/registeruser.service';
import {error} from "@angular/compiler-cli/src/transformers/util";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    user: User = new User();

    constructor(private registerUserService: RegisteruserService, private router: Router){}


    public userRegister(){
      this.registerUserService.registerUser(this.user).subscribe(
        response => {
          console.log("Registrierung erfolgreich")
          alert("Registrierung Erfolgreich. Sie werden zum Login weitergeleitet")
          this.router.navigate(['/login'])

        },
        error => {
          console.log("Registrierung fehlgeschalgen")
          alert("Registrierung fehlgeschlagen. Überprüfen Sie alle Angaben.")
        }
      );
    }


    url: string|null|ArrayBuffer  ="assets/"
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
