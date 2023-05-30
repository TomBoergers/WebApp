import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private readonly socket$: WebSocketSubject<any>;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080/websocket/chat');
  }

  connect() {
    this.socket$.subscribe(
      (message) => {
        console.log(message);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Connection closed.");
      }
    );
  }

  disconnect() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }

  sendMessage(message: { sender: string; content: string }) {
    this.socket$.next({ content: message });
  }

  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
