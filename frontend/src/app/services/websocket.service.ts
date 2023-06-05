import { Injectable } from '@angular/core';
import {Client} from "@stomp/stompjs";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client;

  constructor() {
    this.client = new Client();
    this.client.brokerURL = 'ws://localhost:8080/ws';
  }

  connect() {
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }
}
