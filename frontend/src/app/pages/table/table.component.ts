import {Component, OnInit} from '@angular/core';
import {TableService} from "../../services/table.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tableData: any[][] =[];
  filteredTableData: any[][] = [];
  searchTerm: String = "";

  constructor(private http: HttpClient, private tableService: TableService, private router: Router) {
  }

  ngOnInit() {
    this.http.get<any[][]>("http://localhost:8080/CSV/allNamesAndYears").subscribe(data => {
      this.tableData = data;
    });
  }

  openTable(tableId: number) {
    this.tableService.loadTableId = tableId;
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

  protected readonly length = length;
}
