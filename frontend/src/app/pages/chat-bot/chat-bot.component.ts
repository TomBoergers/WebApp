import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {MessageIo} from "../../model/message-io";

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent {
  messages: string[] = [];
  userInput: string = '';

  sendMessage(): void {
    if (this.userInput.trim() !== '') {
      this.messages.push(this.userInput);
      // Perform chatbot logic or API calls here to generate a response
      this.userInput = '';
    }
  }
}
