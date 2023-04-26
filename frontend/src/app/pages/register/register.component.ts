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
