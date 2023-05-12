import { Component } from '@angular/core';
import { SysAdmin } from 'src/app/classes/sys-admin';

import {error} from "@angular/compiler-cli/src/transformers/util";
import { RegisteradminService } from 'src/app/services/registeradmin.service';


@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent {
  SysAdmin: SysAdmin = new SysAdmin();

  constructor(private registeradminService: RegisteradminService){}


  public sysAdminRegister(){
    this.registeradminService.registerSystemAdmin(this.SysAdmin).subscribe(
      response => {
        console.log("Registrierung erfolgreich")
        alert("Registrierung erfolgreich")
      },
      error => {
        console.log("Registrierung fehlgeschalgen")
        alert("Registrierung fehlgeschlagen")
      }
    );

    ;
  }
}
