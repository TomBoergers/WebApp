import { Component, OnInit } from '@angular/core';
import {LoginadminService} from "../../../services/loginadmin.service";
import {SysAdmin} from "../../../classes/sys-admin";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements  OnInit{

  admin: SysAdmin = new SysAdmin();



  constructor(private loginadminService: LoginadminService) {

  }
  ngOnInit() {
    this.loginadminService.reloadPage()
  }

  adminLogin(data: SysAdmin){
    console.warn(data);
    this.loginadminService.loginAdmin(data)
  }

  protected readonly SysAdmin = SysAdmin;
}
