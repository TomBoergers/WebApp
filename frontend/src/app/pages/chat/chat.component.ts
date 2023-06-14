import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {User} from "../../classes/user";
import {FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {MessageIo} from "../../model/message-io";
import {ActivatedRoute} from "@angular/router";
import {LoginuserService} from "../../services/loginuser.service";
import {HttpClient} from "@angular/common/http";
import {Client, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {friendListService} from "../../services/friendlist.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  url = "http://localhost:8080";
  thisUser!: User;
  channelName!: string;
  socket?: WebSocket;
  stompClient?: Client; //Funktioniert wahrscheinlich nicht
  newMessage = new FormControl('');
  messages?: Observable<Array<MessageIo>>;
  allUsers: User[] = [];
  selectedUser!: User;

  editingMessageId: number | null = null;
  editedMessageContent: string = '';


  constructor(private router: ActivatedRoute, private loginUserService: LoginuserService, private httpClient: HttpClient, private element: ElementRef,
              private friendlistService : friendListService) {
  }

  ngOnInit() {
    this.thisUser = JSON.parse(localStorage.getItem("user")!);
    this.userList();
    // this.element.nativeElement.querySelector("#chat").scrollIntoView();
    // this.getUserbyID(2)
    this.selectUser(this.thisUser)
  }

  ngAfterViewInit() {
    this.scrollDown();
  }

  // getUserbyID(ID: number) : User{
  //   this.friendlistService.getUserbyID(ID).subscribe(data =>{
  //     this.selectedUser = data;
  //     console.log(this.selectedUser)
  //   });
  //   console.log(this.selectedUser)
  //   return this.selectedUser
  //
  // }

  scrollDown() {
    var container = this.element.nativeElement.querySelector("#chat");
    container.scrollTop = container.scrollHeight;
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.connectToChat();
  }

  connectToChat() {
    console.log(this.thisUser);
    console.log(this.selectedUser);
    const id1 = this.thisUser.email;
    const nick1 = this.thisUser.vorname;
    const id2 = this.selectedUser.email;
    const nick2 = this.selectedUser.vorname!;
    console.log(nick1);
    console.log(nick2);

    if (id1 > id2) {
      this.channelName = nick1 + '&' + nick2;
    } else {
      this.channelName = nick2 + '&' + nick1;
    }

    this.loadChat(this.channelName)
    console.log("connecting to chat");
    this.socket = new SockJS(this.url + '/chat');
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.activate();

    if (this.stompClient.connected) {
      console.log('Already connected to the server.');
    } else {
      this.stompClient.onConnect = (frame) => {
        console.log('Connected to the server: ' + frame);
        console.log(this.channelName);
        this.stompClient?.subscribe(
          '/topic/messages/' + this.channelName,
          (response) => {
            this.loadChat(this.channelName);
          }
        );

        this.stompClient?.subscribe('/topic/chat/update', (response) => {
          this.loadChat(this.channelName);
        });
      };
    }
  }

  loadChat(channelName: string) {
    console.log(channelName);
    this.messages = this.httpClient.post<Array<MessageIo>>(this.url + '/getMessages', channelName);
    this.messages.subscribe(data => {
      let mgs: Array<MessageIo> = data;
      mgs.sort((a, b) => (a.messageID > b.messageID) ? 1 : -1)
      this.messages = of(mgs);
      console.log("Messages:", mgs);
      this.scrollDown();
    })
  }

  sendMsg() {
    if(this.newMessage.value !== '') {
      this.stompClient?.publish({
        destination: '/app/chat/' + this.channelName,
        body: JSON.stringify({
          sender: this.thisUser.vorname,
          timestamp: 'to be defined in server',
          content: this.newMessage.value,
        }),
      });
      this.newMessage.setValue('');
    }
  }

  userList() {
    this.loginUserService.getAllUsers().subscribe(
      (users: User[]) => {
        this.allUsers = users;
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  editMode(messageId: number) {
    this.editingMessageId = messageId;
    this.messages?.subscribe(data => {
      const message = data.find(msg => msg.messageID === messageId);
      if (message) {
        this.editedMessageContent = message.content;
      }
    });
  }

  saveEditedMessage() {
    if (this.editingMessageId !== null && this.editedMessageContent !== '') {
      this.editMessage(this.editingMessageId, this.editedMessageContent);
      this.editingMessageId = null;
      this.editedMessageContent = '';
    }
  }

  editMessage(messageId: number, newContent: string) {
    const editedMessage = {
      messageID: messageId,
      content: newContent,
      channel: this.channelName
    };

    this.httpClient.post(this.url + '/editMessage', editedMessage).subscribe(
      () => {
        this.loadChat(this.channelName);
      },
      (error) => {
        console.log('Fehler beim Bearbeiten der Nachricht', error);
      }
    );
  }

  deleteMessage(messageId: number) {
    this.httpClient.delete(this.url + '/deleteMessage/' + messageId).subscribe(
      () => {
        this.loadChat(this.channelName);
      },
      (error) => {
        console.log('Fehler beim Löschen der Nachricht', error);
      }
    );
  }

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }
}
