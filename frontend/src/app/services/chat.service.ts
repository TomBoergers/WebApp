import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Message} from "../classes/message";
import {Observable} from "rxjs";
import {Chat} from "../classes/chat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  updateChat(message: Message, chatId: any): Observable<Object> {
    return this.httpClient.put(this.baseUrl + "/chats/message/" + `${chatId}`, message);
  }

  getChatById(chatId: any) {
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/" + chatId)
  }

  createChatRoom(chat: Chat): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/chats/add", chat);
  }

  getChatByFirstAndSecondUser(firstUserEmail: string, secondUserEmail: string) { //Ändern zu Email oder ID
    const params = new HttpParams()
      .set('firstUserEmail', firstUserEmail)
      .set('secondUserEmail', secondUserEmail);
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/getChatByFirstAndSecondUser", {params})
  }

  getChatByFirstUserNameOrSecondUserName(userEmail: any) {
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/getChatByFirstOrSecondUserEmail/" + userEmail)
  }
}
