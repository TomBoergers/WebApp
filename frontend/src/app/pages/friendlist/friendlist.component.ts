import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";
import {friendListService} from "../../services/friendlist.service";
import {User} from "../../classes/user";

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent {
  tableData: any[][] = [];
  filteredTableData: any[][] = [];
  searchTerm: String = "";
  tableID!: number;
  favorites: any[] = [];
  userID!: number;
  email: string = "";
  privacy!: boolean;
  user!: User;


  constructor(private http: HttpClient, private tableService: TableService, private router: Router, private friendlistService: friendListService) {
  }

  ngOnInit() {
    this.refreshTableData();
  }

  applyFilter() {
    if (this.searchTerm) {
      this.filteredTableData = this.tableData.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredTableData = this.tableData;
    }
  }

  private refreshTableData() {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.userID = userData.id;
      this.http.get<any[][]>("http://localhost:8080/nutzer/getOwnFriendlist/" + this.userID).subscribe(data => {
        console.log(data);
        this.tableData = data;
        this.filteredTableData = data;
      });
    }
  }

  deleteFriend(friendEmail: string) {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.email = userData.email;


      this.friendlistService.deleteFriend(friendEmail, this.email).subscribe(
        (response: any) => {

          alert('Freund wurde entfernt');
          this.refreshTableData();
        },
        (error: any) => {
          console.log(error);
          alert('Fehler beim Löschen des Freundes');
        }
      )
    }
  }

  showFriendslist(friendsID: string, userId: string) {

    this.friendlistService.getPrivacy(parseInt(userId)).subscribe(data => {
      this.privacy = data;
      console.log(this.privacy)
      if (this.privacy) {
        localStorage.setItem("friendsID", userId.toString());
        this.router.navigate(['/friends-list/', friendsID]);
      } else {
        alert("Seine Freundesliste ist auf Privat")
      }

    })
  }

  showProfile(userID: string){
    this.http.get<User>("http://localhost:8080/nutzer/get/" + userID).subscribe(result =>{
      if(result.profilePrivacy){
        this.user = result;
        let userStore = this.user;
        let userString = JSON.stringify(userStore)
        localStorage.setItem("profileUser", userString)
        this.router.navigate(["/otherProfile"])
      }
      else {

        alert("Profil ist Privat")
      }


    })


  }


  setPrivate() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.user = userData;
    this.userID = userData.id;
    this.email = userData.email;


    this.friendlistService.getPrivacy(this.userID).subscribe(data => {
        this.privacy = data;
        console.log(this.privacy)
        if (this.privacy) {
          this.friendlistService.setPrivacy(userData).subscribe()
          alert('Niemand kann deine Freundesliste mehr sehen \n Setting: Privat')
        } else {
          console.log(this.privacy)
          this.friendlistService.setPrivacy(userData).subscribe()
          alert('Jeder kann deine Freundesliste sehen \n Setting: Öffentlich')
        }
      }
    )

  }

  toFriendRequest() {
    this.router.navigate(['/friendRequest']);
  }

  toFriendAdd() {
    this.router.navigate(['/friendAdd']);
  }

  openChat(chatFriendID: string) {

    localStorage.setItem("chatFriendID", chatFriendID)
    this.router.navigate(['/chat']);
  }

}
