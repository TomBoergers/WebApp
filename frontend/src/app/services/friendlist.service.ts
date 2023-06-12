import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../classes/user";

@Injectable({
  providedIn: 'root'
})
export class friendListService {
  user!: object ;

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

  getPrivacy(userEmail: String){
    this.httpClient.get<object>('http://localhost:8080/nutzer/find/' + {userEmail}).subscribe(data =>{
      this.user = data;
      console.log(data)    })
  }

  setPrivacy(){
    this.httpClient.put('http://localhost:8080/nutzer/togglePrivacy', this.user)
  }




}
