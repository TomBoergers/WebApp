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
    this.http.put("http://localhost:8080/setFavTable", tableId)


  }

  setIdent(ident: string, user: User){

  }


}
