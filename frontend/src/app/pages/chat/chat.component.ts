import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Chat} from "../../classes/chat";
import {Message} from "../../classes/message";
import {ChatService} from "../../services/chat.service";
import {Router} from "@angular/router";
import {LoginuserService} from "../../services/loginuser.service";
import {User} from "../../classes/user";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatForm: FormGroup;
  chatObj: Chat = new Chat();
  messageObj: Message = new Message();
  // chatId: number = 22;
  public messageList: any = [];
  public chatList: any = [];
  replymessage: String = "checking";
  public chatData: any;
  msg = "Good work";
  chatId: any = localStorage.getItem('chatId');
  color = "";
  secondUserName = "";
  public alluser: any = [];
  check = localStorage.getItem('username');
  timesRun = 0;
  timesRun2 = 0;

  firstUserName = localStorage.getItem('username') || "";
  senderEmail = localStorage.getItem('username');
  senderCheck = localStorage.getItem('username');

  constructor(private chatService: ChatService, private router: Router, private userService: LoginuserService) {
    this.chatForm = new FormGroup({
      replymessage: new FormControl()
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.chatService.getChatById(localStorage.getItem('chatId')).subscribe(data => {
        this.chatData = data;
        this.messageList = this.chatData.messageList;
        this.secondUserName = this.chatData.secondUserName; //Ändern
        this.firstUserName = this.chatData.firstUserName; //Ändern
      });
    }, 10000);

    let getByName: number = setInterval(() => {
      // For getting all the chat list whose ever is logged in.
      let user = new User();
      user = JSON.parse(localStorage.getItem("user") || "");
      this.chatService.getChatByFirstUserNameOrSecondUserName(user.email).subscribe(data => {
        // console.log(data);
        this.chatData = data;
        this.chatList = this.chatData
      });

      this.timesRun2 += 1;
      if (this.timesRun2 === 2) {
        clearInterval(getByName);
      }
    }, 10000);

    let all: number = setInterval(() => {
      this.userService.getAllUsers().subscribe((result => {
        this.alluser = result;
      }));

      this.timesRun += 1;
      if (this.timesRun === 2) {
        clearInterval(all);
      }
    }, 10000);
  }

  loadChatByEmail(event: string, event1: string) {
    console.log(event, event1);
    // For removing the previous chatId
    localStorage.removeItem("chatId");

    // For checking the chat room by both the emails , if there is present then it will give the chat Id in sessionStorage
    this.chatService.getChatByFirstAndSecondUser(event, event1).subscribe(data => {
      // console.log(data);
      this.chatData = data;
      this.chatId = this.chatData[0].chatId;
      console.log(this.chatId);
      localStorage.setItem('chatId', this.chatId)


      setInterval(() => {
        this.chatService.getChatById(this.chatId).subscribe(data => {
          this.chatData = data;
          this.messageList = this.chatData.messageList;
          this.secondUserName = this.chatData.secondUserName;
          this.firstUserName = this.chatData.firstUserName;
        });
      }, 10000)

    });

  }

  sendMessage() {
    console.log(this.chatForm.value);

    // This will call the update chat method when ever user send the message
    this.messageObj.replyMessage = this.chatForm.value.replymessage;
    this.messageObj.senderEmail = this.senderEmail || "";
    this.chatService.updateChat(this.messageObj, this.chatId).subscribe(data => {
      console.log(data);
      this.chatForm.reset();

      // for displaying the messageList by the chatId
      this.chatService.getChatById(this.chatId).subscribe(data => {
        console.log(data);
        this.chatData = data;
        // console.log(this.chatData.messageList);console.log(JSON.stringify(this.chatData.messageList));
        this.messageList = this.chatData.messageList;
        this.secondUserName = this.chatData.secondUserName;
        this.firstUserName = this.chatData.firstUserName;

      })
    })
  }

  goToChat(username: any) {
    this.chatService.getChatByFirstAndSecondUser(username, localStorage.getItem("username") || "").subscribe(
      (data) => {
        this.chatId = data.chatId;
        localStorage.setItem("chatId", this.chatId);
      },
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = localStorage.getItem("username") || "";
          this.chatObj.secondUserName = username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              localStorage.setItem("chatId", this.chatData.chatId);
            })
        } else {

        }
      });

  }
}
