import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {friendListService} from "../../services/friendlist.service";

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
  email: string ="";
  favorites: any[] = [];
  privacy: boolean = false;

  constructor(private http: HttpClient, private tableService: TableService, private router: Router, private friendlistService : friendListService) {
  }

  ngOnInit() {
    this.refreshTableData();
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
    /*this.http.get<any[][]>("http://localhost:8080/nutzer/ownFriendlist").subscribe(data => {
      this.tableData = data;
      this.filteredTableData = data;
    });*/
  }


  setPrivacy(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.email = userData.email;
    console.log(this.email);
    this.friendlistService.getPrivacy(this.email)
    // if(this.friendlistService.getPrivacy(this.email)){
    //   this.friendlistService.setPrivacy()
    //   alert('')
    // }
    // else {
    //   this.friendlistService.setPrivacy()
    //   alert('')
    // }

  }

  toFriendRequest() {
    this.router.navigate(['/friendRequest']);
  }

  toFriendAdd(){
    this.router.navigate(['/friendAdd']);
  }
}
