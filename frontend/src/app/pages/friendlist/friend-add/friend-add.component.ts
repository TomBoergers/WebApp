import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../services/table.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User} from "../../../classes/user";
import {friendListService} from "../../../services/friendlist.service";

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.scss']
})
export class FriendAddComponent {
  user: User = new User();
  tableData: any[][] = [];
  filteredTableData: any[][] = [];
  searchTerm: string = "";
  email: string ="";
  tableID!: number;
  favorites: any[] = [];

  constructor(private http: HttpClient, private tableService: TableService, private router: Router, private friendlistService : friendListService) {

  }

  ngOnInit() {
    this.refreshTableData();
  }

  addFriend(friendEmail:String) {
    if(localStorage.getItem('user')){
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.email = userData.email;
      console.log(this.email);
      this.friendlistService.freundHinzufügen(friendEmail,this.email).subscribe(
        (response: any)=>{
          console.log(response);
          alert('Freundscahftsandrage erfolgreich gesendet')
        },
        (error: any) =>{
          console.log(error);
          alert('Fehler beim Verschicken der Freundschaftsanfrage');
        }
      )
    }
  }


  applyFilter() {
    if(this.searchTerm) {
      this.filteredTableData = this.tableData.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredTableData = this.tableData;
    }
  }

  private refreshTableData() {
    this.http.get<any[][]>("http://localhost:8080/nutzer/allUsers").subscribe(data => {
      this.tableData = data;
      this.filteredTableData = data;
    });
  }




  toFriendList() {
    this.router.navigate(['/friendList']);
  }

  toFriendRequest() {
    this.router.navigate(['/friendRequest']);
  }
}
