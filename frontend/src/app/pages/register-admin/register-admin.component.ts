import { Component } from '@angular/core';
import { SysAdmin } from 'src/app/classes/sys-admin';

import {error} from "@angular/compiler-cli/src/transformers/util";
import { RegisteradminService } from 'src/app/services/registeradmin.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent {
  SysAdmin: SysAdmin = new SysAdmin();

  constructor(private registeradminService: RegisteradminService, private router: Router) {

  }


  public sysAdminRegister(){
    this.registeradminService.registerSystemAdmin(this.SysAdmin).subscribe(
      response => {
        console.log("Registrierung erfolgreich")
        alert("Registrierung erfolgreich")
        this.router.navigate(['/login-admin'])
      },
      error => {
        console.log("Registrierung fehlgeschalgen")
        alert("Registrierung fehlgeschlagen")
      }
    );

    ;
  }
}
