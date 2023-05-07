import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SysAdmin } from '../classes/sys-admin';

@Injectable({
  providedIn: 'root'
})
export class RegisteradminService {
  private baseUrl = 'http://localhost:8080'
  constructor(private httpClient: HttpClient) { }

  registerSystemAdmin(sysAdmin: SysAdmin): Observable<object>{
    return this.httpClient.post('http://localhost:8080/SysAdmin/add', sysAdmin);
  }


}
