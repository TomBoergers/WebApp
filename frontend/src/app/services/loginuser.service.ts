import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseUrl = 'http://localhost:8080'


  constructor(private httpClient: HttpClient) { }

  loginUser(user: User): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/nutzer/login', user);
  }

}
