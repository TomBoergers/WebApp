import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseUrl = 'http://localhost:8080/nutzer/all'


  constructor(private httpClient: HttpClient) { }

  loginUser(user: User): Observable<object>{
    return this.httpClient.post('${this.baseUrl}', user);
  }

  getUser(user: User) {

      return this.httpClient.get<User>(this.baseUrl)

  }

}
