import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../services/table.service";
import {Router} from "@angular/router";

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
}
