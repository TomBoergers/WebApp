import { Component } from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  constructor(private webSocketService: WebsocketService) {
  }

  connectClient() {
    this.webSocketService.connect();
    console.log("Connecting...");
  }

  disconnectClient() {
    this.webSocketService.disconnect();
    console.log("Disconnecting...");
  }
}
