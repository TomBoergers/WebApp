import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Chat} from "../../classes/chat";
import {ChatService} from "../../services/chat.service";
import {LoginuserService} from "../../services/loginuser.service";
import {User} from "../../classes/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuType:string = 'default';

  public alluser: any = [];
  chatId: any = 0;
  chatObj: Chat = new Chat();
  public chatData: any = [];
  user = new User();
  test: string = "test1@gmail.com";



constructor(private router: Router, private chatService: ChatService, private loginUserService: LoginuserService)  {}


ngOnInit() {
  this.router.events.subscribe((val:any)=>{

      if(localStorage.getItem('admin')){
        this.menuType ="admin"
      }
      else if(localStorage.getItem('user')){
        this.menuType ="user"
      }
      else {
        this.menuType ="default"
      }
  })

  let all = setInterval(() => {
    this.alluser = this.loginUserService.getAllUsers()
  }, 1000);

  this.user = JSON.parse(localStorage.getItem("user") || "");
}
  logout(){
    localStorage.removeItem('admin')
    localStorage.removeItem('user')
    localStorage.removeItem('picture')
    localStorage.removeItem('table')
    localStorage.removeItem('favoriteTable');
    localStorage.removeItem('favoriteTableIdentifier')
    this.router.navigate([''])

  }

  goToChat(friendEmail: any) {
    this.chatService.getChatByFirstAndSecondUser(friendEmail, this.user.email).subscribe(
      (data) => {
        this.chatId = data.chatId;
        localStorage.setItem("chatId", this.chatId);

        localStorage.setItem("gotochat", "false");
        this.router.navigateByUrl('/chat');
      },
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = localStorage.getItem("user") || "";
          this.chatObj.secondUserName = friendEmail;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              localStorage.setItem("chatId", this.chatData.chatId);

              localStorage.setItem("gotochat", "false");
              this.router.navigateByUrl('/chat');
            })
        } else {

        }
      });
  }

  protected readonly localStorage = localStorage;
}
