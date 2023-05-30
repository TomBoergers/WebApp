import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../services/table.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.scss']
})
export class FriendAddComponent {
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

  openTable(tableId: number, tableIdentifier: string) {
    this.tableService.loadTableId = tableId;
    this.tableID = tableId;
    localStorage.setItem("tableID", tableId.toString());
    localStorage.setItem("identifier", tableIdentifier);
    this.router.navigate(['/table', tableId]);
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

  toFriendRequest() {
    this.router.navigate(['/friendRequest']);
  }
}
