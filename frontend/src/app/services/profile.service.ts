import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../classes/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getPrivacy(userId: Number){
    return this.http.get<boolean>("http://localhost:8080/nutzer/getProfilePrivacy/" + userId);
  }

  setPrivacy(user: User): Observable<object> {
    return this.http.put('http://localhost:8080/nutzer/toggleProfilePrivacy', user)
  }

}
