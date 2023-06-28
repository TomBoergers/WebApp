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
        if(this.userInput === 'Hallo'){
          this.messages.push('Hallo Mensch')
        }
        else if(this.userInput === 'Welchen Datenntypen kann mann einlesen?'){
          this.messages.push('')
        }
        else if(this.userInput === 'Wo finde ich mein Profil'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else if(this.userInput === 'Wo finde ich die Karte?'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else if(this.userInput === 'Kann ich eigene Dateien einlesen?'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else if(this.userInput === 'Wo kann ich meine Dateien exportieren?'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else if(this.userInput === 'Sehen andere User mein Profil?'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else if(this.userInput === 'Welche Artenn von Diagrammen gibt es?'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else if(this.userInput === 'Worüber ist diese Website'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else if(this.userInput === 'Wie erstelle ich einen Post'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else if(this.userInput === 'Wie finde ich zum Chat Bot'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else if(this.userInput === 'Macht Döner schöner?'){
          this.messages.push('Hallo, wie geht es dir?')
        }
        else {
          this.messages.push('Darauf habe ich keine antwort')
        }
      // Perform chatbot logic or API calls here to generate a response
      this.userInput = '';
    }
  }
}
