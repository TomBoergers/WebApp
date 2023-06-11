import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {User} from "../../classes/user";
import {FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {MessageIo} from "../../model/message-io";
import {ActivatedRoute} from "@angular/router";
import {LoginuserService} from "../../services/loginuser.service";
import {HttpClient} from "@angular/common/http";
import {Client, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";


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

  constructor(private router: ActivatedRoute, private loginUserService: LoginuserService, private httpClient: HttpClient, private element: ElementRef) {
  }

  ngOnInit() {
    this.thisUser = JSON.parse(localStorage.getItem("user")!);
    this.userList();
    this.element.nativeElement.querySelector("#chat").scrollIntoView();
  }

  ngAfterViewInit() {
    this.scrollDown();
  }

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

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }
}
