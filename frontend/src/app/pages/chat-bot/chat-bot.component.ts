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
          this.messages.push('XML, CSV Dateien')
        }
        else if(this.userInput === 'Wo finde ich mein Profil'){
          this.messages.push('Über die Navigationsleiste über den Reiter Profil.')
        }
        else if(this.userInput === 'Wo finde ich die Karte?'){
          this.messages.push('Über die Navigationsleiste über den Reiter Karte')
        }
        else if(this.userInput === 'Kann ich eigene Dateien einlesen?'){
          this.messages.push('Nein.')
        }
        else if(this.userInput === 'Wo kann ich meine Dateien exportieren?'){
          this.messages.push('In der Tabellen Ansicht über den Button "Export"')
        }
        else if(this.userInput === 'Sehen andere User mein Profil?'){
          this.messages.push('Ja, über die Freundesliste sehen andere User mein Profil.')
        }
        else if(this.userInput === 'Welche Arten von Diagrammen kann man anzeigen?'){
          this.messages.push('Man kann die Daten als Balkendiagramm oder als Kreisdiagramm anezigen.')
        }
        else if(this.userInput === 'Worüber ist diese Website'){
          this.messages.push('Diese Website handelt über die Stadt Aachen.')
        }
        else if(this.userInput === 'Wie erstelle ich einen Post'){
          this.messages.push('Über den Reiter Forum landest, du auf der Forum Homepage.' +
            ' Von da aus kannst du auf den Button "Post Create" gehen und dort einen Post erstellen')
        }
        else if(this.userInput === 'Kann ich mit meinen Freunden chatten?'){
          this.messages.push('Ja, du kannst nachdem du deine Freunde hinzugefügt hast mit ihnen chatten.')
        }
        else if(this.userInput === 'Macht Döner schöner?'){
          this.messages.push('Ja, aufjedenfall.')
        }
        else {
          this.messages.push('Darauf habe ich keine antwort')
        }
      // Perform chatbot logic or API calls here to generate a response
      this.userInput = '';
    }
  }
}
