import { Component } from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private webSocketService: WebsocketService) {
  }

  ngOnInit() {
    this.webSocketService.connect();
    this.webSocketService.getMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const message = {
        sender: 'Test',
        content: this.newMessage
      };

      this.webSocketService.sendMessage(message);
      this.newMessage = '';
    }
  }
}
