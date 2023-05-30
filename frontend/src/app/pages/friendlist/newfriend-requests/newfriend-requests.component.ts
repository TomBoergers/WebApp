import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../services/table.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

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
    this.http.get<any[][]>("http://localhost:8080/CSV/allNamesAndYears").subscribe(data => {
      this.tableData = data;
      this.filteredTableData = data;

      this.http.get<any[][]>("http://localhost:8080/XML/allNamesAndYears").subscribe(data => {
        this.tableData = this.filteredTableData.concat(data);
        this.filteredTableData = this.tableData;
      });
    });
  }

  toFriendList() {
    this.router.navigate(['/friendList']);
  }

  toFriendAdd(){
    this.router.navigate(['/friendAdd']);
  }

}
