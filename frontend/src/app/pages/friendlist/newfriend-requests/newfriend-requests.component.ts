import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../services/table.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {friendListService} from "../../../services/friendlist.service";

@Component({
  selector: 'app-newfriend-requests',
  templateUrl: './newfriend-requests.component.html',
  styleUrls: ['./newfriend-requests.component.scss']
})
export class NewfriendRequestsComponent {
  tableData: any[][] = [];
  filteredTableData: any[][] = [];
  searchTerm: String = "";
  tableID!: number;
  favorites: any[] = [];
  userID!: number;
  email: string = "";


  constructor(private http: HttpClient, private tableService: TableService, private router: Router, private friendListService: friendListService) {
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
      this.http.get<any[][]>("http://localhost:8080/nutzer/getFriendRequests/" + this.userID).subscribe(data => {
        this.tableData = data;
        this.filteredTableData = data;
      });
    }
  }

  acceptFriend(friendEmail: string) {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.email = userData.email;
      console.log(friendEmail);
      this.friendListService.acceptFriend(friendEmail, this.email).subscribe(
        (response: any) => {
          alert('Freund wurde hinzugefügt');
          this.refreshTableData();
        },
        (error: any) => {
          console.log(error);
          alert('Fehler beim Hinuzufügen des Freundes');
        })
    }
  }
  declineFriend(friendEmail: string){
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.email = userData.email;
      console.log(friendEmail);
      this.friendListService.diclineFriend(friendEmail, this.email).subscribe(
        (response: any) => {
          alert('Freundschaftsanfrage wurde erfolgreich abgelehnt');
          this.refreshTableData();
        },
        (error: any) => {
          console.log(error);
          alert('Fehler beim Ablehnen der Freundschaftsanfrage');
        })
    }
  }

  toFriendList() {
    this.router.navigate(['/friendList']);
  }

  toFriendAdd(){
    this.router.navigate(['/friendAdd']);
  }

}
