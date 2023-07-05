import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../services/table.service";
import {Router} from "@angular/router";
import {User} from "../../../classes/user";

@Component({
  selector: 'app-friends-table',
  templateUrl: './friends-table.component.html',
  styleUrls: ['./friends-table.component.scss']
})
export class FriendsTableComponent {
  tableData: any[][] = [];
  filteredTableData: any[][] = [];
  searchTerm: String = "";
  tableID!: number;
  friendsID:String = "";
  favorites: any[] = [];
  user!: User;


  constructor(private http: HttpClient, private tableService: TableService, private router: Router) {
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
    this.http.get<any[][]>("http://localhost:8080/nutzer/getFriendlist/" + localStorage.getItem("friendsID")).subscribe(data => {
      this.tableData = data;
      this.filteredTableData = data;
    });
  }



  toHome(){
    this.router.navigate(['/friendList']);
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

}
