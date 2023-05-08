import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../classes/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class zweiFaktorService{

  private baseUrl = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }
  codePruefenUser(email:String, code:String): Observable<object>{
    return this.httpClient.post('http://localhost:8080/nutzer/zweiFaktor', {email,code});
  }
  codePruefenAdmin(email:String, code:String): Observable<object>{
    return this.httpClient.post('http://localhost:8080/SysAdmin/zweiFaktor', {email,code});
  }

}
