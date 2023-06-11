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

  getPrivacy(userEmail: String){
    this.httpClient.get<object>('http://localhost:8080/nutzer/find/' + {userEmail}).subscribe(data =>{
      this.user = data;
      console.log(data)    })
  }

  setPrivacy(){
    this.httpClient.put('http://localhost:8080/nutzer/togglePrivacy', this.user)
  }



  /*eigeneFreundeAnzeigen(email: string): Observable<object> {
    const params = { email: email }; // Parameter als Objekt erstellen
    return this.httpClient.get('http://localhost:8080/nutzer/ownFriendlist', { params: params });
  }*/



}
