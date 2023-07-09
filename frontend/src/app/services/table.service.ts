import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../classes/user";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  loadTableId!: number;

  constructor(private http: HttpClient) {
  }

  setFavTable(tableId: number , user: User){
    return this.http.put("http://localhost:8080/nutzer/setFavTable/" + tableId, user);
    console.log(tableId)


  }

  setIdent(ident: string, user: User){
    return this.http.put("http://localhost:8080/nutzer/setFavTableIdent/" + ident, user);
    console.log(ident)
  }


}
