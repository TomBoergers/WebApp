import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$;

  constructor() {
    this.socket$ = webSocket("localhost:8080/websocket/chat");
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

  sendMessage(message: string) {
    this.socket$.next({ content: message });
  }
}
