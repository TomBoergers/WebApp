import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';


@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  private baseUrl = 'http://localhost:8081/nutzer/all'


  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<object>{
    return this.httpClient.post('${this.baseUrl}', user);
  }
}
