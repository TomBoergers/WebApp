import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../classes/user";

@Injectable({
  providedIn: 'root'
})
export class friendListService {
  user!: User ;
  privacy: boolean =  true;

  private baseUrl = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) {
  }


  freundHinzufügen(friendEmail: String, ownEmail: String ): Observable<object> {
    return this.httpClient.put('http://localhost:8080/nutzer/sendRequest', {friendEmail, ownEmail});
  }
  acceptFriend(friendEmail: String, ownEmail: String ): Observable<object> {
    return this.httpClient.put('http://localhost:8080/nutzer/acceptFriend',{friendEmail, ownEmail});
  }
  diclineFriend(friendEmail: String, ownEmail: String ):Observable<object>{
    return this.httpClient.put('http://localhost:8080/nutzer/denyFriend',{friendEmail, ownEmail});
  }
  deleteFriend(friendEmail: String, ownEmail: String ): Observable<object> {
    return this.httpClient.put('http://localhost:8080/nutzer/deleteFriend',{friendEmail, ownEmail});
  }

  getPrivacy(userId: Number){
    return this.httpClient.get<boolean>("http://localhost:8080/nutzer/getPrivacy/" + userId);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>("http://localhost:8080/nutzer/find/" + email);
  }
  setPrivacy(user: User){
    this.httpClient.put('http://localhost:8080/nutzer/togglePrivacy', user)
  }




}
