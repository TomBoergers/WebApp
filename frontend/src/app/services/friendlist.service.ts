import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
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
    console.log("break3")
    return this.httpClient.put('http://localhost:8080/nutzer/deleteFriend',{friendEmail, ownEmail});
  }

  getPrivacy(userId: Number){
    return this.httpClient.get<boolean>("http://localhost:8080/nutzer/getPrivacy/" + userId);
  }
  getFriendslist(userId: Number){
    return this.httpClient.get<any>('http://localhost:8080/nutzer/allFriends/'+userId);

  }

  setPrivacy(user: User): Observable<object> {
    return this.httpClient.put('http://localhost:8080/nutzer/togglePrivacy', user)
  }

  getUserbyID(ID:number): Observable<User>{
    return this.httpClient.get<User>("http://localhost:8080/nutzer/get/" + ID)
  }




}
